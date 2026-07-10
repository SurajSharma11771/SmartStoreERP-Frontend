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
      sx={{ mt: 3, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "text.primary" }}>Invoice</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Customer</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Total Amount</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Returned</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Net Sale</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Return Status</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Status</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Date</TableCell>
            <TableCell sx={{ color: "text.primary" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell sx={{ color: "text.primary" }}>{sale.invoiceNumber}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{sale.customerName}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>₹{sale.totalAmount}</TableCell>
              <TableCell>
                <Chip label={sale.status} color="success" size="small" />
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                {new Date(sale.saleDate).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
  ₹{sale.returnedAmount}
</TableCell>

<TableCell sx={{ color: "text.primary" }}>
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

