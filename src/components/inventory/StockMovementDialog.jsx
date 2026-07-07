import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function StockMovementDialog({ open, onClose, movements }) {
  const getTypeColor = (type) => {
    if (type === "PURCHASE") return "success";
    if (type === "SALE") return "error";
    if (type === "ADD") return "primary";
    if (type === "REMOVE") return "warning";
    return "default";
  };

  const getQuantitySign = (type) => {
    if (type === "PURCHASE" || type === "ADD") return "+";
    return "-";
  };

  const formatMoney = (value) => {
    if (value === null || value === undefined) return "—";
    return `₹${value}`;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Stock Movement History</DialogTitle>

      <DialogContent>
        {movements.length === 0 ? (
          <Typography>No stock movements found.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {movements.map((movement, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Chip
                      label={movement.type}
                      color={getTypeColor(movement.type)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{movement.referenceNumber}</TableCell>
                  <TableCell>{movement.productName}</TableCell>
                  <TableCell>
                    {getQuantitySign(movement.type)}
                    {movement.quantity}
                  </TableCell>
                  <TableCell>{formatMoney(movement.price)}</TableCell>
                  <TableCell>{formatMoney(movement.totalAmount)}</TableCell>
                  <TableCell>
                    {new Date(movement.date).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default StockMovementDialog;