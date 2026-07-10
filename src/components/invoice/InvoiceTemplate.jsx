import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

function InvoiceTemplate({ invoice }) {
  if (!invoice) return null;

  return (
    <Box
      id="invoice-print-area"
      sx={{
        bgcolor: "white",
        color: "black",
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          SMARTSTORE ERP
        </Typography>
        <Typography>Purchase Invoice</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography><b>Invoice No:</b> {invoice.invoiceNumber}</Typography>
          <Typography><b>Supplier:</b> {invoice.supplierName}</Typography>
          <Typography><b>Status:</b> {invoice.status}</Typography>
        </Box>

        <Box>
          <Typography>
            <b>Date:</b> {new Date(invoice.purchaseDate).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Product</b></TableCell>
            <TableCell><b>Qty</b></TableCell>
            <TableCell><b>Price</b></TableCell>
            <TableCell><b>Total</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {invoice.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>₹{item.purchasePrice}</TableCell>
              <TableCell>₹{item.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Grand Total: ₹{invoice.totalAmount}
        </Typography>
      </Box>

      <Box sx={{ mt: 6, display: "flex", justifyContent: "space-between" }}>
        <Typography>Thank you for your business.</Typography>
        <Typography>Authorized Signature</Typography>
      </Box>
    </Box>
  );
}

export default InvoiceTemplate;
