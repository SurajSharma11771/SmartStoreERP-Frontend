import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import api from "../../services/api";

import PageHeader from "../../components/common/PageHeader";
import SearchToolbar from "../../components/common/SearchToolbar";

import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";

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
  categoryId: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [openForm, setOpenForm] = useState(false);

  const [statusDialogOpen, setStatusDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar,
  } = useAppSnackbar();

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.data || []);
    } catch (error) {
      console.error(
        "Product loading failed:",
        error
      );

      showError("Unable to load products.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data.data || []);
    } catch (error) {
      console.error(
        "Category loading failed:",
        error
      );

      showError("Unable to load categories.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const activeCategories = useMemo(() => {
    return categories.filter(
      (category) => category.status !== false
    );
  }, [categories]);

  const handleSave = async () => {
    if (!form.categoryId) {
      showError("Please select a category.");
      return;
    }

    try {
      const payload = {
        name: form.name,
        sku: form.sku,
        barcode: form.barcode || null,
        description: form.description || null,
        sellingPrice: Number(form.sellingPrice),
        costPrice: Number(form.costPrice),
        quantity: Number(form.quantity),
        minimumStock: Number(form.minimumStock),
        categoryId: Number(form.categoryId),
      };

      if (isEdit) {
        payload.status =
          form.status !== false;

        await api.put(
          `/products/${selectedProduct.id}`,
          payload
        );

        showSuccess(
          "Product updated successfully!"
        );
      } else {
        await api.post("/products", payload);

        showSuccess(
          "Product added successfully!"
        );
      }

      setOpenForm(false);
      setForm(initialForm);
      setIsEdit(false);
      setSelectedProduct(null);

      await fetchProducts();
    } catch (error) {
      console.error(
        "Product save failed:",
        error
      );

      showError(
        error.response?.data?.message ||
          "Unable to save product."
      );
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      barcode: product.barcode || "",
      description: product.description || "",
      sellingPrice:
        product.sellingPrice ?? "",
      costPrice: product.costPrice ?? "",
      quantity: product.quantity ?? "",
      minimumStock:
        product.minimumStock ?? "",
      categoryId:
        product.categoryId ?? "",
      status: product.status,
    });

    setIsEdit(true);
    setOpenForm(true);
  };

  const handleStatusClick = (product) => {
    setSelectedProduct(product);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async () => {
    if (!selectedProduct) {
      return;
    }

    const currentlyActive =
      selectedProduct.status !== false;

    const newStatus = !currentlyActive;

    try {
      await api.patch(
        `/products/${selectedProduct.id}/status`,
        null,
        {
          params: {
            active: newStatus,
          },
        }
      );

      showSuccess(
        newStatus
          ? "Product activated successfully!"
          : "Product deactivated successfully!"
      );

      setStatusDialogOpen(false);
      setSelectedProduct(null);

      await fetchProducts();
    } catch (error) {
      console.error(
        "Product status update failed:",
        error
      );

      showError(
        error.response?.data?.message ||
          "Unable to update product status."
      );
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await api.delete(
        `/products/${selectedProduct.id}`
      );

      showSuccess(
        "Product permanently deleted successfully!"
      );

      setDeleteDialogOpen(false);
      setSelectedProduct(null);

      await fetchProducts();
    } catch (error) {
      console.error(
        "Product delete failed:",
        error
      );

      showError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "This product cannot be deleted. Deactivate it instead."
      );

      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const filteredProducts = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesSearch =
          String(product.name || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.sku || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.categoryName || "")
            .toLowerCase()
            .includes(searchValue);

        const isActive =
          product.status !== false;

        const matchesStatus =
          statusFilter === "ALL" ||
          (
            statusFilter === "ACTIVE" &&
            isActive
          ) ||
          (
            statusFilter === "INACTIVE" &&
            !isActive
          );

        const matchesCategory =
          categoryFilter === "ALL" ||
          String(product.categoryId) ===
            String(categoryFilter);

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory
        );
      })
      .sort((first, second) => {
        const firstActive =
          first.status !== false;

        const secondActive =
          second.status !== false;

        if (firstActive === secondActive) {
          return (
            Number(second.id) -
            Number(first.id)
          );
        }

        return firstActive ? -1 : 1;
      });
  }, [
    products,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const selectedProductActive =
    selectedProduct?.status !== false;

  return (
    <Box>
      <PageHeader
        title="Products"
        buttonText="Add Product"
        onButtonClick={() => {
          setForm(initialForm);
          setSelectedProduct(null);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Products..."
      />

      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          gap: 2,
        }}
      >
        <TextField
          select
          fullWidth
          size="small"
          label="Product Status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          sx={{
            maxWidth: {
              xs: "100%",
              sm: 220,
            },
            bgcolor: "background.paper",
          }}
        >
          <MenuItem value="ALL">
            All Products
          </MenuItem>

          <MenuItem value="ACTIVE">
            Active Products
          </MenuItem>

          <MenuItem value="INACTIVE">
            Inactive Products
          </MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          size="small"
          label="Category"
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
          sx={{
            maxWidth: {
              xs: "100%",
              sm: 240,
            },
            bgcolor: "background.paper",
          }}
        >
          <MenuItem value="ALL">
            All Categories
          </MenuItem>

          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={String(category.id)}
            >
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onStatusChange={handleStatusClick}
        onDelete={handleDeleteClick}
      />

      <ProductForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedProduct(null);
          setForm(initialForm);
          setIsEdit(false);
        }}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={isEdit}
        categories={activeCategories}
      />

      <Dialog
        open={statusDialogOpen}
        onClose={() =>
          setStatusDialogOpen(false)
        }
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {selectedProductActive
            ? "Deactivate Product"
            : "Activate Product"}
        </DialogTitle>

        <DialogContent>
          {selectedProductActive
            ? `Deactivate "${selectedProduct?.name}"? This product will become unavailable for new transactions.`
            : `Activate "${selectedProduct?.name}"? This product will become available for new transactions.`}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setStatusDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: selectedProductActive
                ? "#dc2626"
                : "#16a34a",

              "&:hover": {
                bgcolor: selectedProductActive
                  ? "#b91c1c"
                  : "#15803d",
              },
            }}
            onClick={handleStatusChange}
          >
            {selectedProductActive
              ? "Deactivate"
              : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Permanently Delete Product
        </DialogTitle>

        <DialogContent>
          Delete "{selectedProduct?.name}" permanently?
          This is only allowed when the product has no
          sales, purchase, or stock-adjustment history.
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>

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