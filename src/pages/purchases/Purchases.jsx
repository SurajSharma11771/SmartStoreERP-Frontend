import { useEffect, useState } from "react";


import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader";

import PurchaseSummaryCard from "../../components/purchases/PurchaseSummaryCard";
import PurchaseHistoryTable from "../../components/purchases/PurchaseHistoryTable";
import PurchaseForm from "../../components/purchases/PurchaseForm";
import PurchaseDetailsDialog from "../../components/purchases/PurchaseDetailsDialog";
import { Alert, Box, Snackbar, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
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
    try {
      await api.post("/purchases", {
        supplierId: Number(form.supplierId),
        invoiceNumber: form.invoiceNumber,
        items: form.items.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          purchasePrice: Number(item.purchasePrice),
        })),
      });

      setSnackbarOpen(true);
      setOpen(false);

      setForm({
        supplierId: "",
        invoiceNumber: "",
        items: [{ ...emptyItem }],
      });

      fetchProducts();
      fetchPurchases();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Purchase save failed"
      );
    }
  };
  const handleViewPurchase = async (id) => {
  const res = await api.get(`/purchases/${id}`);
  setSelectedPurchase(res.data.data);
  setDetailsOpen(true);
};
const filteredPurchases = purchases.filter((purchase) =>
  purchase.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
  purchase.supplierName.toLowerCase().includes(search.toLowerCase())
);
const handleDeletePurchase = async (purchase) => {
  const confirmDelete = window.confirm(
    `Delete purchase ${purchase.invoiceNumber}? Stock will be rolled back.`
  );

  if (!confirmDelete) return;

  await api.delete(`/purchases/${purchase.id}`);

  fetchPurchases();
  fetchProducts();
  setDeleteSnackbarOpen(true);
};

  return (
    <Box>
      <PageHeader
        title="Purchases"
        buttonText="New Purchase"
        onButtonClick={() => setOpen(true)}
      />

      <PurchaseSummaryCard />
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
      bgcolor: "#020617",
      color: "white",
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

      <PurchaseHistoryTable
  purchases={filteredPurchases}
  onView={handleViewPurchase}
  onEdit={(purchase) => alert("Edit purchase will be added after stock recalculation backend")}
  onDelete={handleDeletePurchase}
/>

      <PurchaseForm
        open={open}
        onClose={() => setOpen(false)}
        suppliers={suppliers}
        products={products}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Purchase saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar
  open={deleteSnackbarOpen}
  autoHideDuration={3000}
  onClose={() => setDeleteSnackbarOpen(false)}
>
  <Alert severity="success" onClose={() => setDeleteSnackbarOpen(false)}>
    Purchase deleted and stock rolled back!
  </Alert>
</Snackbar>
    </Box>
  );
}

export default Purchases;