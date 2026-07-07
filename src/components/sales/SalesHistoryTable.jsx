import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

function SalesHistoryTable({
  sales,
  onView,
  onDelete,
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
            <TableCell sx={{ color: "white" }}>Customer</TableCell>
            <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
            <TableCell sx={{ color: "white" }}>Returned</TableCell>
            <TableCell sx={{ color: "white" }}>Net Sale</TableCell>
            <TableCell sx={{ color: "white" }}>Return Status</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell sx={{ color: "white" }}>{sale.invoiceNumber}</TableCell>
              <TableCell sx={{ color: "white" }}>{sale.customerName}</TableCell>
              <TableCell sx={{ color: "white" }}>₹{sale.totalAmount}</TableCell>
              <TableCell>
                <Chip label={sale.status} color="success" size="small" />
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {new Date(sale.saleDate).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: "white" }}>
  ₹{sale.returnedAmount}
</TableCell>

<TableCell sx={{ color: "white" }}>
  ₹{sale.netAmount}
</TableCell>

<TableCell>
  <Chip
    label={sale.returnStatus}
    color={
      sale.returnStatus === "RETURNED"
        ? "error"
        : sale.returnStatus === "PARTIAL_RETURN"
        ? "warning"
        : "success"
    }
    size="small"
  />
</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" onClick={() => onView(sale.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
  color="info"
  onClick={() => onReturn(sale)}
>
  <AssignmentReturnIcon />
</IconButton>
<IconButton
  color="error"
  onClick={() => onDelete(sale)}
>
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

export default SalesHistoryTable;