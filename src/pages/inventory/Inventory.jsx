import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TablePagination,
} from "@mui/material";

import InventorySummaryCards from "../../components/inventory/InventorySummaryCards";
import StockMovementDialog from "../../components/inventory/StockMovementDialog";
import StockAdjustmentDialog from "../../components/inventory/StockAdjustmentDialog";

import { exportInventoryExcel } from "../../components/export/ExcelExporter";
import { exportInventoryPdf } from "../../components/export/PdfExporter";

import api from "../../services/api";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [movementOpen, setMovementOpen] = useState(false);
  const [movements, setMovements] = useState([]);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.data);
    });

    api.get("/categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "" ? true : product.categoryName === categoryFilter;

    const matchesLowStock =
      !lowStockOnly || product.quantity <= product.minimumStock;

    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleViewMovements = async (productId) => {
    const res = await api.get(`/inventory/movements/${productId}`);
    setMovements(res.data.data);
    setMovementOpen(true);
  };
  const handleAdjustStock = (product) => {
  setSelectedProduct(product);
  setAdjustmentOpen(true);
};

const handleSaveAdjustment = async (data) => {
  await api.post("/inventory/adjust", data);

  const productsRes = await api.get("/products");
  setProducts(productsRes.data.data);

  setAdjustmentOpen(false);
};

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Inventory
      </Typography>

      <InventorySummaryCards products={products} />

      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => exportInventoryExcel(filteredProducts)}
        >
          Export Excel
        </Button>

        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => exportInventoryPdf(filteredProducts)}
        >
          Export PDF
        </Button>
      </Box>

      <TextField
        fullWidth
        size="small"
        placeholder="Search product or SKU..."
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

      <Box sx={{ mt: 2, mb: 2 }}>
        <TextField
          select
          label="Category"
          size="small"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            minWidth: 220,
            bgcolor: "white",
            borderRadius: 1,
          }}
        >
          <MenuItem value="">All Categories</MenuItem>

          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
          />
        }
        label="Show Low Stock Only"
        sx={{
          color: "white",
          mb: 2,
        }}
      />

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#020617",
          border: "1px solid #1e293b",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>SKU</TableCell>
              <TableCell sx={{ color: "white" }}>Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Minimum Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Cost Price</TableCell>
              <TableCell sx={{ color: "white" }}>Stock Value</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product) => {
              const stockValue =
                Number(product.costPrice) * Number(product.quantity);

              const isLowStock = product.quantity <= product.minimumStock;

              return (
                <TableRow key={product.id}>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.sku}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.quantity}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.minimumStock}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    ₹{product.costPrice}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>₹{stockValue}</TableCell>
                  <TableCell>
                    <Chip
                      label={isLowStock ? "Low Stock" : "In Stock"}
                      color={isLowStock ? "error" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleViewMovements(product.id)}
                    >
                      Ledger
                    </Button>
                    <Button
  size="small"
  variant="contained"
  sx={{ ml: 1 }}
  onClick={() => handleAdjustStock(product)}
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

      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          color: "white",
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
    </Box>
  );
}

export default Inventory;