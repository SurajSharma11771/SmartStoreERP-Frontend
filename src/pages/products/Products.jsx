import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import api from "../../services/api";

import PageHeader from "../../components/common/PageHeader";
import SearchToolbar from "../../components/common/SearchToolbar";

import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";
import DeleteProductDialog from "../../components/products/DeleteProductDialog";
import AppSnackbar from "../../components/common/AppSnackbar";
import useAppSnackbar from "../../hooks/useAppSnackbar";
   
const initialForm = {
  name: "",
  sku: "",
  barcode: "",
  description: "",
  sellingPrice: "",
  costPrice: "",
  quantity: "",
  minimumStock: "",
};

function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
  snackbar,
  showSuccess,
  showError,
  closeSnackbar,
} = useAppSnackbar();

  const [form, setForm] = useState(initialForm);

  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {

    const res = await api.get("/products");

    setProducts(res.data.data);

  };

  useEffect(() => {

    fetchProducts();

  }, []);

 const handleSave = async () => {
  try {
    const payload = {
      ...form,
      sellingPrice: Number(form.sellingPrice),
      costPrice: Number(form.costPrice),
      quantity: Number(form.quantity),
      minimumStock: Number(form.minimumStock),
    };

    if (isEdit) {
      await api.put(`/products/${selectedProduct.id}`, payload);
      showSuccess("Product updated successfully!");
    } else {
      await api.post("/products", payload);
      showSuccess("Product added successfully!");
    }

    setOpenForm(false);
    setForm(initialForm);
    setIsEdit(false);
    setSelectedProduct(null);

    await fetchProducts();
  } catch (error) {
    console.error("Product save failed:", error);

    showError(
      error.response?.data?.message ||
        "Unable to save product."
    );
  }
};

  const handleEdit = (product) => {

    setSelectedProduct(product);

    setForm(product);

    setIsEdit(true);

    setOpenForm(true);

  };

  const handleDeleteClick = (product) => {

    setSelectedProduct(product);

    setDeleteOpen(true);

  };

  const handleDelete = async () => {
  if (!selectedProduct) {
    return;
  }

  try {
    await api.delete(`/products/${selectedProduct.id}`);

    showSuccess("Product deleted successfully!");

    setDeleteOpen(false);
    setSelectedProduct(null);

    await fetchProducts();
  } catch (error) {
    console.error("Product delete failed:", error);

    showError(
      error.response?.data?.message ||
        "Unable to delete product."
    );
  }
};

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <Box>

      <PageHeader
        title="Products"
        buttonText="Add Product"
        onButtonClick={() => {
          setForm(initialForm);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Products..."
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={isEdit}
      />

      <DeleteProductDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
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

export default Products;
