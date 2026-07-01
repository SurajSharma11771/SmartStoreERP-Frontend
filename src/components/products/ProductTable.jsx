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
        bgcolor: "#020617",
        border: "1px solid #1e293b",
      }}
    >
      <Table>

        <TableHead>

          <TableRow>

            <TableCell sx={{ color: "white" }}>Name</TableCell>

            <TableCell sx={{ color: "white" }}>SKU</TableCell>

            <TableCell sx={{ color: "white" }}>Selling</TableCell>

            <TableCell sx={{ color: "white" }}>Cost</TableCell>

            <TableCell sx={{ color: "white" }}>Quantity</TableCell>

            <TableCell sx={{ color: "white" }}>Status</TableCell>

            <TableCell sx={{ color: "white" }}>
              Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {products.map((product) => (

            <TableRow key={product.id} hover>

              <TableCell sx={{ color: "white" }}>
                {product.name}
              </TableCell>

              <TableCell sx={{ color: "white" }}>
                {product.sku}
              </TableCell>

              <TableCell sx={{ color: "white" }}>
                ₹{product.sellingPrice}
              </TableCell>

              <TableCell sx={{ color: "white" }}>
                ₹{product.costPrice}
              </TableCell>

              <TableCell sx={{ color: "white" }}>
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