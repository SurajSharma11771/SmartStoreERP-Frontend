import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
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
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [returnSnackbarOpen, setReturnSnackbarOpen] = useState(false);

  const [returnOpen, setReturnOpen] = useState(false);
  const [returnSale, setReturnSale] = useState(null);

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
    try {
      await api.post("/sales", {
        customerId: Number(form.customerId),
        invoiceNumber: form.invoiceNumber,
        items: form.items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          sellingPrice: Number(item.sellingPrice),
        })),
      });

      alert("Sale saved successfully!");

      setOpen(false);
      setForm({
        customerId: "",
        invoiceNumber: "",
        items: [{ ...emptyItem }],
      });

      fetchSales();
      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Sale save failed"
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
    setDeleteSnackbarOpen(true);
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

      setReturnSnackbarOpen(true);
    } catch (error) {
      console.error("Sales return error:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Sales return failed"
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

  return (
    <Box>
      <PageHeader
        title="Sales"
        buttonText="New Sale"
        onButtonClick={() => setOpen(true)}
      />

      <SaleSummaryCard sales={sales} />

      <Button
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
        onClick={() => exportSalesExcel(filteredSales)}
      >
        Export Excel
      </Button>

      <TextField
        fullWidth
        size="small"
        placeholder="Search invoice or customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            bgcolor: "#020617",
            color: "white",
            borderRadius: 2,
          },
          "& input::placeholder": {
            color: "#94a3b8",
            opacity: 1,
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ bgcolor: "white", borderRadius: 1 }}
        />

        <TextField
          label="End Date"
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ bgcolor: "white", borderRadius: 1 }}
        />

        <TextField
          select
          label="Customer"
          size="small"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 1, minWidth: 180 }}
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
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 1, minWidth: 160 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>

        <Button
          variant="outlined"
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
        sx={{ color: "white", mt: 2 }}
      />

      <SaleForm
        open={open}
        onClose={() => setOpen(false)}
        customers={customers}
        products={products}
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

      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setDeleteSnackbarOpen(false)}>
          Sale deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
  open={returnSnackbarOpen}
  autoHideDuration={3000}
  onClose={() => setReturnSnackbarOpen(false)}
>
  <Alert severity="success" onClose={() => setReturnSnackbarOpen(false)}>
    Sales return completed. Stock increased successfully!
  </Alert>
</Snackbar>
    </Box>
  );
}

export default Sales;