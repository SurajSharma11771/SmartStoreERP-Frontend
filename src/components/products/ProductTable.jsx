import {
  Box,
  Button,
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
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ProductTable({
  products,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <>
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
          <Table sx={{ minWidth: 940 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Selling</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => {
                const isActive =
                  product.status !== false;

                return (
                  <TableRow
                    key={product.id}
                    hover
                    sx={{
                      opacity: isActive ? 1 : 0.55,
                      bgcolor: isActive
                        ? "transparent"
                        : "action.hover",
                    }}
                  >
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>

                    <TableCell>
                      {formatCurrency(
                        product.sellingPrice
                      )}
                    </TableCell>

                    <TableCell>
                      {formatCurrency(product.costPrice)}
                    </TableCell>

                    <TableCell>
                      {product.quantity}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        color={
                          isActive ? "success" : "default"
                        }
                        label={
                          isActive ? "Active" : "Inactive"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(product)}
                          disabled={!isActive}
                          aria-label="Edit product"
                        >
                          <EditIcon />
                        </IconButton>

                        <Button
                          size="small"
                          variant={
                            isActive
                              ? "outlined"
                              : "contained"
                          }
                          color={
                            isActive
                              ? "error"
                              : "success"
                          }
                          startIcon={
                            isActive
                              ? <BlockOutlinedIcon />
                              : <CheckCircleIcon />
                          }
                          onClick={() =>
                            onStatusChange(product)
                          }
                        >
                          {isActive
                            ? "Deactivate"
                            : "Activate"}
                        </Button>

                        <IconButton
                          color="error"
                          onClick={() => onDelete(product)}
                          aria-label="Permanently delete product"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="mobile-data-list">
        {products.length === 0 ? (
          <Paper
            className="mobile-data-card"
            elevation={0}
          >
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No products found.
            </Typography>
          </Paper>
        ) : (
          products.map((product) => {
            const isActive =
              product.status !== false;

            return (
              <Paper
                key={product.id}
                className="mobile-data-card"
                elevation={0}
                sx={{
                  opacity: isActive ? 1 : 0.58,
                  bgcolor: isActive
                    ? "background.paper"
                    : "action.hover",
                  filter: isActive
                    ? "none"
                    : "grayscale(0.3)",
                }}
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
                    color={
                      isActive ? "success" : "default"
                    }
                    label={
                      isActive ? "Active" : "Inactive"
                    }
                  />
                </Box>

                <Box className="mobile-data-card-grid">
                  <Box>
                    <Typography className="mobile-data-label">
                      Selling Price
                    </Typography>

                    <Typography className="mobile-data-value">
                      {formatCurrency(
                        product.sellingPrice
                      )}
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
                    disabled={!isActive}
                    aria-label="Edit product"
                  >
                    <EditIcon />
                  </IconButton>

                  <Button
                    size="small"
                    variant={
                      isActive
                        ? "outlined"
                        : "contained"
                    }
                    color={
                      isActive ? "error" : "success"
                    }
                    startIcon={
                      isActive
                        ? <BlockOutlinedIcon />
                        : <CheckCircleIcon />
                    }
                    onClick={() =>
                      onStatusChange(product)
                    }
                  >
                    {isActive
                      ? "Deactivate"
                      : "Activate"}
                  </Button>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(product)}
                    aria-label="Permanently delete product"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>
    </>
  );
}

export default ProductTable;