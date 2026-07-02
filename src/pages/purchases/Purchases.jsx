import { useEffect, useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";

import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader";

import PurchaseSummaryCard from "../../components/purchases/PurchaseSummaryCard";
import PurchaseHistoryTable from "../../components/purchases/PurchaseHistoryTable";
import PurchaseForm from "../../components/purchases/PurchaseForm";
import PurchaseDetailsDialog from "../../components/purchases/PurchaseDetailsDialog";

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
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

  return (
    <Box>
      <PageHeader
        title="Purchases"
        buttonText="New Purchase"
        onButtonClick={() => setOpen(true)}
      />

      <PurchaseSummaryCard />

      <PurchaseHistoryTable purchases={purchases} onView={handleViewPurchase} />

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
    </Box>
  );
}

export default Purchases;