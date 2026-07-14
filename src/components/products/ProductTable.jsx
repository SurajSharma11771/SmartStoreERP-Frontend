import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({ products, onEdit, onDelete }) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <>
      {/* Desktop table */}
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
          <Table sx={{ minWidth: 780 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>Name</TableCell>
                <TableCell sx={{ color: "text.primary" }}>SKU</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Selling</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Cost</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Quantity</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Status</TableCell>
                <TableCell sx={{ color: "text.primary" }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {product.name}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {product.sku}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(product.sellingPrice)}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(product.costPrice)}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {product.quantity}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      color={product.status ? "success" : "error"}
                      label={product.status ? "Active" : "Inactive"}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(product)}
                      aria-label="Edit product"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(product)}
                      aria-label="Delete product"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Mobile cards */}
      <Box className="mobile-data-list">
        {products.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography color="text.secondary" textAlign="center">
              No products found.
            </Typography>
          </Paper>
        ) : (
          products.map((product) => (
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
                  size="small"
                  color={product.status ? "success" : "error"}
                  label={product.status ? "Active" : "Inactive"}
                />
              </Box>

              <Box className="mobile-data-card-grid">
                <Box>
                  <Typography className="mobile-data-label">
                    Selling Price
                  </Typography>

                  <Typography className="mobile-data-value">
                    {formatCurrency(product.sellingPrice)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Cost Price
                  </Typography>

                  <Typography className="mobile-data-value">
                    {formatCurrency(product.costPrice)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Quantity
                  </Typography>

                  <Typography className="mobile-data-value">
                    {product.quantity}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Minimum Stock
                  </Typography>

                  <Typography className="mobile-data-value">
                    {product.minimumStock ?? "—"}
                  </Typography>
                </Box>
              </Box>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(product)}
                  aria-label="Edit product"
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(product)}
                  aria-label="Delete product"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </>
  );
}

export default ProductTable;