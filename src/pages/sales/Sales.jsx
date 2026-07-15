import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TablePagination,
  TextField,
} from "@mui/material";

import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader";
import SaleSummaryCard from "../../components/sales/SaleSummaryCard";
import SalesHistoryTable from "../../components/sales/SalesHistoryTable";
import SaleForm from "../../components/sales/SaleForm";
import SaleDetailsDialog from "../../components/sales/SaleDetailsDialog";
import SalesReturnDialog from "../../components/sales/SalesReturnDialog";
import { exportSalesExcel } from "../../components/export/ExcelExporter";
import AppSnackbar from "../../components/common/AppSnackbar";
import useAppSnackbar from "../../hooks/useAppSnackbar";

const emptyItem = {
  productId: "",
  quantity: "",
  sellingPrice: "",
};

function Sales() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customerId: "",
    invoiceNumber: "",
    items: [{ ...emptyItem }],
  });

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [returnOpen, setReturnOpen] = useState(false);
  const [returnSale, setReturnSale] = useState(null);
  const {
  snackbar,
  showSuccess,
  showError,
  closeSnackbar,
} = useAppSnackbar();
  const fetchSales = () => {
    api.get("/sales").then((res) => setSales(res.data.data));
  };

  const fetchProducts = () => {
    api.get("/products").then((res) => setProducts(res.data.data));
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
    api.get("/customers").then((res) => setCustomers(res.data.data));
  }, []);

  const handleViewSale = async (id) => {
    const res = await api.get(`/sales/${id}`);
    setSelectedSale(res.data.data);
    setDetailsOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;
    setForm({ ...form, items: updatedItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { ...emptyItem }] });
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const calculateTotal = () => {
    return form.items.reduce((total, item) => {
      return total + Number(item.quantity || 0) * Number(item.sellingPrice || 0);
    }, 0);
  };

  const handleSave = async () => {
  if (!form.invoiceNumber.trim()) {
    showError("Invoice number is required.");
    return;
  }

  if (!form.customerId) {
    showError("Please select a customer.");
    return;
  }

  if (
    form.items.length === 0 ||
    form.items.some(
      (item) =>
        !item.productId ||
        Number(item.quantity) <= 0 ||
        Number(item.sellingPrice) <= 0
    )
  ) {
    showError(
      "Please complete all sale item fields."
    );
    return;
  }

  try {
    await api.post("/sales", {
      customerId: Number(form.customerId),
      invoiceNumber: form.invoiceNumber.trim(),
      items: form.items.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        sellingPrice: Number(item.sellingPrice),
      })),
    });

    showSuccess("Sale saved successfully!");

    setOpen(false);

    setForm({
      customerId: "",
      invoiceNumber: "",
      items: [{ ...emptyItem }],
    });

    fetchSales();
    fetchProducts();
  } catch (error) {
    console.error("Sale save failed:", error);

    showError(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Sale save failed."
    );
  }
};

  const handleDeleteSale = async (sale) => {
    const confirmDelete = window.confirm(
      `Delete sale ${sale.invoiceNumber}? Stock will be restored.`
    );

    if (!confirmDelete) return;

    await api.delete(`/sales/${sale.id}`);

    fetchSales();
    fetchProducts();
    showSuccess("Sale deleted and stock restored!");
  };

  const handleOpenReturn = async (sale) => {
    const res = await api.get(`/sales/${sale.id}`);
    setReturnSale(res.data.data);
    setReturnOpen(true);
  };

  const handleSaveReturn = async (data) => {
    try {
      console.log("Sales return data:", data);

      await api.post("/sales/return", data);

      setReturnOpen(false);
      setReturnSale(null);

      fetchSales();
      fetchProducts();

     showSuccess("Sale returned successfully!");
    } catch (error) {
  console.error("Sales return error:", error);

  showError(
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Sales return failed."
  );
}
  };

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(search.toLowerCase());

    const saleDate = new Date(sale.saleDate);
    const matchesStartDate = startDate ? saleDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? saleDate <= new Date(endDate) : true;

    const matchesCustomer = customerFilter
      ? sale.customerName === customerFilter
      : true;

    const matchesStatus = statusFilter ? sale.status === statusFilter : true;

    return (
      matchesSearch &&
      matchesStartDate &&
      matchesEndDate &&
      matchesCustomer &&
      matchesStatus
    );
  });

  const paginatedSales = filteredSales.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
const activeProducts = products.filter(
  (product) => product.status !== false
);
  return (
    <Box>
      <PageHeader
        title="Sales"
        buttonText="New Sale"
        onButtonClick={() => setOpen(true)}
      />

      <SaleSummaryCard sales={sales} />

      <Box className="mobile-export-row">
  <Button
    variant="outlined"
    onClick={() => exportSalesExcel(filteredSales)}
  >
    Export Excel
  </Button>
</Box>

      <TextField
        fullWidth
        size="small"
        placeholder="Search invoice or customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: 2,
          },
          "& input::placeholder": {
            color: "#94a3b8",
            opacity: 1,
          },
        }}
      />

      <Box className="mobile-filter-row">
        <TextField
        fullWidth
  className="erp-filter-date"
  label="Start Date"
  type="date"
  size="small"
  slotProps={{
  inputLabel: {
    shrink: true,
  },
}}
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
/>

        <TextField
        fullWidth
  className="erp-filter-date"
  label="End Date"
  type="date"
  size="small"
  slotProps={{
  inputLabel: {
    shrink: true,
  },
}}
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
/>

        <TextField
  select
  fullWidth
  label="Customer"
  size="small"
  value={customerFilter}
  onChange={(e) => setCustomerFilter(e.target.value)}
  sx={{
    bgcolor: "text.primary",
    borderRadius: 1,
  }}
>
          <MenuItem value="">All Customers</MenuItem>
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.name}>
              {customer.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ bgcolor: "text.primary", borderRadius: 1}}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          className="mobile-clear-btn"
          onClick={() => {
            setSearch("");
            setStartDate("");
            setEndDate("");
            setCustomerFilter("");
            setStatusFilter("");
          }}
        >
          Clear
        </Button>
      </Box>

      <SalesHistoryTable
        sales={paginatedSales}
        onView={handleViewSale}
        onDelete={handleDeleteSale}
        onReturn={handleOpenReturn}
      />

      <TablePagination
        component="div"
        count={filteredSales.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ color: "text.primary", mt: 2 }}
      />

      <SaleForm
  open={open}
  onClose={() => setOpen(false)}
  customers={customers}
  products={activeProducts}
  form={form}
  handleChange={handleChange}
  handleItemChange={handleItemChange}
  addItem={addItem}
  removeItem={removeItem}
  calculateTotal={calculateTotal}
  handleSave={handleSave}
/>

      <SaleDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        sale={selectedSale}
      />

      <SalesReturnDialog
        open={returnOpen}
        onClose={() => setReturnOpen(false)}
        sale={returnSale}
        onSave={handleSaveReturn}
      />

      <AppSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={closeSnackbar}
/>
    </Box>
  );
}

export default Sales;

