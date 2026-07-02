import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";

function PurchaseHistoryTable({ purchases, onView }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        bgcolor: "#020617",
        border: "1px solid #1e293b",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Invoice</TableCell>
            <TableCell sx={{ color: "white" }}>Supplier</TableCell>
            <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Action</TableCell>
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
                <Button size="small" variant="outlined" onClick={() => onView(purchase.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurchaseHistoryTable;