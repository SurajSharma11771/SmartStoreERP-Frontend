import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";

function PurchaseReturnDialog({ open, onClose, purchase, onSave }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setProductId("");
      setQuantity("");
      setReason("");
    }
  }, [open]);

  if (!purchase) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Purchase Return</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Invoice" value={purchase.invoiceNumber} disabled />

          <TextField
            select
            label="Product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {purchase.items.map((item) => (
              <MenuItem key={item.productId} value={item.productId}>
                {item.productName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Return Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <TextField
            label="Reason"
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={() =>
            onSave({
              purchaseId: purchase.id,
              productId: Number(productId),
              quantity: Number(quantity),
              reason,
            })
          }
        >
          Save Return
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseReturnDialog;