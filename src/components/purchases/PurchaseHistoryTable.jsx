import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

function PurchaseHistoryTable({
  purchases,
  onView,
  onEdit,
  onDelete,
  onPdf,
  onReturn,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 3, bgcolor: "#020617", border: "1px solid #1e293b" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Invoice</TableCell>
            <TableCell sx={{ color: "white" }}>Supplier</TableCell>
            <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell sx={{ color: "white" }}>{purchase.invoiceNumber}</TableCell>
              <TableCell sx={{ color: "white" }}>{purchase.supplierName}</TableCell>
              <TableCell sx={{ color: "white" }}>₹{purchase.totalAmount}</TableCell>
              <TableCell>
                <Chip label={purchase.status} color="success" size="small" />
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" onClick={() => onView(purchase.id)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton color="secondary" onClick={() => onPdf(purchase.id)}>
                    <PictureAsPdfIcon />
                  </IconButton>

                  <IconButton color="info" onClick={() => onReturn(purchase)}>
                    <AssignmentReturnIcon />
                  </IconButton>

                  <IconButton color="warning" onClick={() => onEdit(purchase)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => onDelete(purchase)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurchaseHistoryTable;