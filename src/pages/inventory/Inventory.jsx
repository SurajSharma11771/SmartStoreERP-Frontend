import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import InventorySummaryCards from "../../components/inventory/InventorySummaryCards";
import StockMovementDialog from "../../components/inventory/StockMovementDialog";
import StockAdjustmentDialog from "../../components/inventory/StockAdjustmentDialog";

import {
  exportInventoryExcel,
} from "../../components/export/ExcelExporter";

import {
  exportInventoryPdf,
} from "../../components/export/PdfExporter";

import api from "../../services/api";

import AppSnackbar from "../../components/common/AppSnackbar";
import useAppSnackbar from "../../hooks/useAppSnackbar";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] =
    useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =
    useState(5);

  const [movementOpen, setMovementOpen] =
    useState(false);
  const [movements, setMovements] = useState([]);

  const [adjustmentOpen, setAdjustmentOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar,
  } = useAppSnackbar();

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]).catch((error) => {
      console.error("Inventory loading failed:", error);
      showError("Unable to load inventory.");
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = String(
      product.name || ""
    ).toLowerCase();

    const productSku = String(
      product.sku || ""
    ).toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      productName.includes(searchValue) ||
      productSku.includes(searchValue);

    const matchesCategory =
      categoryFilter === "" ||
      product.categoryName === categoryFilter;

    const matchesLowStock =
      !lowStockOnly ||
      Number(product.quantity || 0) <=
        Number(product.minimumStock || 0);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLowStock
    );
  });

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleViewMovements = async (productId) => {
    try {
      const res = await api.get(
        `/inventory/movements/${productId}`
      );

      setMovements(res.data.data);
      setMovementOpen(true);
    } catch (error) {
      console.error(error);
      showError("Unable to load stock movements.");
    }
  };

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setAdjustmentOpen(true);
  };

  const handleSaveAdjustment = async (data) => {
    try {
      await api.post("/inventory/adjust", data);

      await fetchProducts();

      const adjustmentType = String(
        data.adjustmentType ||
          data.type ||
          data.operation ||
          ""
      ).toUpperCase();

      const isIncrease = [
        "IN",
        "ADD",
        "INCREASE",
        "STOCK_IN",
      ].includes(adjustmentType);

      showSuccess(
        isIncrease
          ? "Quantity increased successfully!"
          : "Quantity decreased successfully!"
      );

      setAdjustmentOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(
        "Stock adjustment failed:",
        error
      );

      showError(
        error.response?.data?.message ||
          "Unable to adjust stock."
      );
    }
  };

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Inventory
      </Typography>

      <InventorySummaryCards products={products} />

      <Box className="mobile-export-row">
        <Button
          variant="outlined"
          onClick={() =>
            exportInventoryExcel(filteredProducts)
          }
        >
          Export Excel
        </Button>

        <Button
          variant="outlined"
          onClick={() =>
            exportInventoryPdf(filteredProducts)
          }
        >
          Export PDF
        </Button>
      </Box>

      <TextField
        fullWidth
        size="small"
        placeholder="Search product or SKU..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
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
          select
          fullWidth
          label="Category"
          size="small"
          value={categoryFilter}
          onChange={(event) => {
            setCategoryFilter(event.target.value);
            setPage(0);
          }}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <MenuItem value="">
            All Categories
          </MenuItem>

          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.name}
            >
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={lowStockOnly}
            onChange={(event) => {
              setLowStockOnly(
                event.target.checked
              );

              setPage(0);
            }}
          />
        }
        label="Show Low Stock Only"
        sx={{
          color: "text.primary",
          mb: 2,
        }}
      />

      <Box className="desktop-data-table">
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 980 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>
                  Product
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  SKU
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Stock
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Minimum Stock
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Cost Price
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Stock Value
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Status
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedProducts.map((product) => {
                const quantity = Number(
                  product.quantity || 0
                );

                const minimumStock = Number(
                  product.minimumStock || 0
                );

                const stockValue =
                  Number(product.costPrice || 0) *
                  quantity;

                const isLowStock =
                  quantity <= minimumStock;

                return (
                  <TableRow key={product.id} hover>
                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {product.name}
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {product.sku}
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {quantity}
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {minimumStock}
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {formatCurrency(
                        product.costPrice
                      )}
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.primary" }}
                    >
                      {formatCurrency(stockValue)}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          isLowStock
                            ? "Low Stock"
                            : "In Stock"
                        }
                        color={
                          isLowStock
                            ? "error"
                            : "success"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          handleViewMovements(
                            product.id
                          )
                        }
                      >
                        Ledger
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        sx={{ ml: 1 }}
                        onClick={() =>
                          handleAdjustStock(product)
                        }
                      >
                        Adjust
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="mobile-data-list">
        {paginatedProducts.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No inventory products found.
            </Typography>
          </Paper>
        ) : (
          paginatedProducts.map((product) => {
            const quantity = Number(
              product.quantity || 0
            );

            const minimumStock = Number(
              product.minimumStock || 0
            );

            const stockValue =
              Number(product.costPrice || 0) *
              quantity;

            const isLowStock =
              quantity <= minimumStock;

            return (
              <Paper
                key={product.id}
                className="mobile-data-card"
                elevation={0}
              >
                <Box className="mobile-data-card-header">
                  <Box sx={{ minWidth: 0 }}>
                    <Typography className="mobile-data-card-title">
                      {product.name}
                    </Typography>

                    <Typography className="mobile-data-label">
                      SKU: {product.sku || "—"}
                    </Typography>
                  </Box>

                  <Chip
                    label={
                      isLowStock
                        ? "Low Stock"
                        : "In Stock"
                    }
                    color={
                      isLowStock
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </Box>

                <Box className="mobile-data-card-grid">
                  <Box>
                    <Typography className="mobile-data-label">
                      Stock
                    </Typography>

                    <Typography className="mobile-data-value">
                      {quantity}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography className="mobile-data-label">
                      Minimum Stock
                    </Typography>

                    <Typography className="mobile-data-value">
                      {minimumStock}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography className="mobile-data-label">
                      Cost Price
                    </Typography>

                    <Typography className="mobile-data-value">
                      {formatCurrency(
                        product.costPrice
                      )}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography className="mobile-data-label">
                      Stock Value
                    </Typography>

                    <Typography className="mobile-data-value">
                      {formatCurrency(stockValue)}
                    </Typography>
                  </Box>
                </Box>

                <Box className="mobile-data-actions">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      handleViewMovements(product.id)
                    }
                  >
                    Ledger
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    onClick={() =>
                      handleAdjustStock(product)
                    }
                  >
                    Adjust
                  </Button>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>

      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={(event, newPage) =>
          setPage(newPage)
        }
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(
            parseInt(event.target.value, 10)
          );

          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          color: "text.primary",
          mt: 2,
        }}
      />

      <StockMovementDialog
        open={movementOpen}
        onClose={() => setMovementOpen(false)}
        movements={movements}
      />

      <StockAdjustmentDialog
        open={adjustmentOpen}
        onClose={() => setAdjustmentOpen(false)}
        product={selectedProduct}
        onSave={handleSaveAdjustment}
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

export default Inventory;