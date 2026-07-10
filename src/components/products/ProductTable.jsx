import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "background.paper",
        border: "1px solid", borderColor: "divider",
      }}
    >
      <Table>

        <TableHead>

          <TableRow>

            <TableCell sx={{ color: "text.primary" }}>Name</TableCell>

            <TableCell sx={{ color: "text.primary" }}>SKU</TableCell>

            <TableCell sx={{ color: "text.primary" }}>Selling</TableCell>

            <TableCell sx={{ color: "text.primary" }}>Cost</TableCell>

            <TableCell sx={{ color: "text.primary" }}>Quantity</TableCell>

            <TableCell sx={{ color: "text.primary" }}>Status</TableCell>

            <TableCell sx={{ color: "text.primary" }}>
              Action
            </TableCell>

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
                ₹{product.sellingPrice}
              </TableCell>

              <TableCell sx={{ color: "text.primary" }}>
                ₹{product.costPrice}
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
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(product)}
                >
                  <DeleteIcon />
                </IconButton>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default ProductTable;

