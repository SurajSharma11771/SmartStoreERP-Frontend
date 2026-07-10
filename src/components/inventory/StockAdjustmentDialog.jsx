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

import { useState, useEffect } from "react";

function StockAdjustmentDialog({
  open,
  onClose,
  product,
  onSave,
}) {

  const [adjustmentType, setAdjustmentType] = useState("ADD");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setAdjustmentType("ADD");
      setQuantity("");
      setReason("");
    }
  }, [open]);

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Stock Adjustment
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <TextField
            label="Product"
            value={product.name}
            fullWidth
            disabled
          />

          <TextField
            label="Current Stock"
            value={product.quantity}
            fullWidth
            disabled
          />

          <TextField
            select
            label="Adjustment Type"
            value={adjustmentType}
            onChange={(e) =>
              setAdjustmentType(e.target.value)
            }
          >
            <MenuItem value="ADD">
              ADD
            </MenuItem>

            <MenuItem value="REMOVE">
              REMOVE
            </MenuItem>
          </TextField>

          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <TextField
            label="Reason"
            multiline
            rows={3}
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            onSave({
              productId: product.id,
              adjustmentType,
              quantity: Number(quantity),
              reason,
            })
          }
        >
          Save
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default StockAdjustmentDialog;
