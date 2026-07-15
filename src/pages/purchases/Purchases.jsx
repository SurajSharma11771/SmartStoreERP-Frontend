import { useEffect, useState } from "react";


import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader";

import PurchaseSummaryCard from "../../components/purchases/PurchaseSummaryCard";
import PurchaseHistoryTable from "../../components/purchases/PurchaseHistoryTable";
import PurchaseForm from "../../components/purchases/PurchaseForm";
import PurchaseDetailsDialog from "../../components/purchases/PurchaseDetailsDialog";
import PurchaseReturnDialog from "../../components/purchases/PurchaseReturnDialog";
import {
  Alert,
  Box,
  Snackbar,
  TextField,
  TablePagination,
  MenuItem,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import PurchaseStats from "../../components/purchases/PurchaseStats";
import { exportPurchaseInvoicePdf } from "../../components/export/PdfExporter";
import { exportPurchasesExcel } from "../../components/export/ExcelExporter";
import AppSnackbar from "../../components/common/AppSnackbar";
import useAppSnackbar from "../../hooks/useAppSnackbar";

const emptyItem = {
  productId: "",
  quantity: "",
  purchasePrice: "",
};

function Purchases() {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [returnOpen, setReturnOpen] = useState(false);
const [returnPurchase, setReturnPurchase] = useState(null);
const {
  snackbar,
  showSuccess,
  showError,
  closeSnackbar,
} = useAppSnackbar();
  const [form, setForm] = useState({
    supplierId: "",
    invoiceNumber: "",
    items: [{ ...emptyItem }],
  });

  const fetchPurchases = () => {
    api.get("/purchases").then((res) => setPurchases(res.data.data));
  };

  const fetchProducts = () => {
    api.get("/products").then((res) => setProducts(res.data.data));
  };

  useEffect(() => {
    api.get("/suppliers").then((res) => setSuppliers(res.data.data));
    fetchProducts();
    fetchPurchases();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;
    setForm({ ...form, items: updatedItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { ...emptyItem }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const calculateTotal = () => {
    return form.items.reduce((total, item) => {
      const qty = Number(item.quantity || 0);
      const price = Number(item.purchasePrice || 0);
      return total + qty * price;
    }, 0);
  };

  const handleSave = async () => {
    if (!form.invoiceNumber.trim()) {
    showError("Invoice number is required.");
    return;
  }

  if (!form.supplierId) {
    showError("Please select a supplier.");
    return;
  }

  if (
    form.items.length === 0 ||
    form.items.some(
      (item) =>
        !item.productId ||
        Number(item.quantity) <= 0 ||
        Number(item.purchasePrice) <= 0
    )
  ) {
    showError(
      "Please complete all purchase item fields."
    );
    return;
  }

    try {
      await api.post("/purchases", {
        supplierId: Number(form.supplierId),
        invoiceNumber: form.invoiceNumber.trim(),
        items: form.items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          purchasePrice: Number(item.purchasePrice),
        })),
      });

      showSuccess("Purchase saved successfully!");
      setOpen(false);

      setForm({
        supplierId: "",
        invoiceNumber: "",
        items: [{ ...emptyItem }],
      });

      fetchProducts();
      fetchPurchases();
    } catch (error) {
      showError(
        error.response?.data?.message ||
  "Unable to save purchase."
);
    }
  };
  const handleViewPurchase = async (id) => {
  const res = await api.get(`/purchases/${id}`);
  setSelectedPurchase(res.data.data);
  setDetailsOpen(true);
};
const handleDownloadPdf = async (id) => {
  const res = await api.get(`/purchases/${id}`);
  exportPurchaseInvoicePdf(res.data.data);
};
const filteredPurchases = purchases.filter((purchase) => {
  const matchesSearch =
    purchase.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    purchase.supplierName.toLowerCase().includes(search.toLowerCase());

  const purchaseDate = new Date(purchase.purchaseDate);
  const matchesStartDate = startDate ? purchaseDate >= new Date(startDate) : true;
  const matchesEndDate = endDate ? purchaseDate <= new Date(endDate) : true;

  const matchesSupplier = supplierFilter
    ? purchase.supplierName === supplierFilter
    : true;

  const matchesStatus = statusFilter
    ? purchase.status === statusFilter
    : true;

  return (
    matchesSearch &&
    matchesStartDate &&
    matchesEndDate &&
    matchesSupplier &&
    matchesStatus
  );
});
const paginatedPurchases = filteredPurchases.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);
const activeProducts = products.filter(
  (product) => product.status !== false
);

const handleDeletePurchase = async (purchase) => {
  const confirmDelete = window.confirm(
    `Delete purchase ${purchase.invoiceNumber}? Stock will be rolled back.`
  );
  const handleOpenReturn = async (purchase) => {
  const res = await api.get(`/purchases/${purchase.id}`);
  setReturnPurchase(res.data.data);
  setReturnOpen(true);
};

const handleSaveReturn = async (data) => {
  await api.post("/purchases/return", data);

  setReturnOpen(false);
  setReturnPurchase(null);

  fetchPurchases();
  fetchProducts();

  alert("Purchase return completed successfully!");
};

  if (!confirmDelete) return;

  await api.delete(`/purchases/${purchase.id}`);

  fetchPurchases();
  fetchProducts();
  showSuccess("Purchase deleted and stock rolled back!");
};
const handleOpenReturn = async (purchase) => {
  const res = await api.get(`/purchases/${purchase.id}`);
  setReturnPurchase(res.data.data);
  setReturnOpen(true);
};

const handleSaveReturn = async (data) => {
  await api.post("/purchases/return", data);

  setReturnOpen(false);
  setReturnPurchase(null);

  fetchPurchases();
  fetchProducts();

  alert("Purchase return completed successfully!");
};

  return (
    <Box>
      <PageHeader
        title="Purchases"
        buttonText="New Purchase"
        onButtonClick={() => setOpen(true)}
      />

      <PurchaseSummaryCard />
      <PurchaseStats purchases={purchases} />
      <Box className="mobile-export-row">
  <Button
    variant="outlined"
    onClick={() => exportPurchasesExcel(filteredPurchases)}
  >
    Export Excel
  </Button>
</Box>
      <TextField
  fullWidth
  size="small"
  placeholder="Search invoice or supplier..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    mt: 3,
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
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: "#94a3b8" }} />
      </InputAdornment>
    ),
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
  label="Supplier"
  size="small"
  value={supplierFilter}
  onChange={(e) => setSupplierFilter(e.target.value)}
  sx={{
    bgcolor: "text.primary",
    borderRadius: 1,
  }}
>
  <MenuItem value="">All Suppliers</MenuItem>
  {suppliers.map((supplier) => (
    <MenuItem key={supplier.id} value={supplier.name}>
      {supplier.name}
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
 className="mobile-clear-btn"
  variant="outlined"
  onClick={() => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setSupplierFilter("");
    setStatusFilter("");
  }}
>
  Clear
</Button>
</Box>
      <PurchaseHistoryTable
  purchases={paginatedPurchases}
  onView={handleViewPurchase}
  onPdf={handleDownloadPdf}
  onEdit={(purchase) => alert("Edit purchase will be added after stock recalculation backend")}
  onDelete={handleDeletePurchase}
  onReturn={handleOpenReturn}
/>

<TablePagination
  component="div"
  count={filteredPurchases.length}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
  rowsPerPageOptions={[5, 10, 25]}
  sx={{
    color: "text.primary",
    mt: 2,
  }}
/>

      <PurchaseForm
        open={open}
        onClose={() => setOpen(false)}
        suppliers={suppliers}
        products={activeProducts}
        form={form}
        handleChange={handleChange}
        handleItemChange={handleItemChange}
        addItem={addItem}
        removeItem={removeItem}
        calculateTotal={calculateTotal}
        handleSave={handleSave}
      />
        <PurchaseDetailsDialog
  open={detailsOpen}
  onClose={() => setDetailsOpen(false)}
  purchase={selectedPurchase}
/>
<PurchaseReturnDialog
  open={returnOpen}
  onClose={() => setReturnOpen(false)}
  purchase={returnPurchase}
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

export default Purchases;

