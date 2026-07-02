import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Box,
} from "@mui/material";

function PurchaseDetailsDialog({ open, onClose, purchase }) {
  if (!purchase) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Purchase Details</DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography><b>Invoice:</b> {purchase.invoiceNumber}</Typography>
          <Typography><b>Supplier:</b> {purchase.supplierName}</Typography>
          <Typography><b>Status:</b> {purchase.status}</Typography>
          <Typography>
            <b>Date:</b> {new Date(purchase.purchaseDate).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {purchase.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.purchasePrice}</TableCell>
                <TableCell>₹{item.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h6" fontWeight="bold" mt={3}>
          Grand Total: ₹{purchase.totalAmount}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseDetailsDialog;