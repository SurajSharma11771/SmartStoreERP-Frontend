import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

import InvoiceTemplate from "../invoice/InvoiceTemplate";

function PurchaseDetailsDialog({ open, onClose, purchase }) {
  if (!purchase) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Purchase Invoice</DialogTitle>

      <DialogContent>
  <InvoiceTemplate invoice={purchase} />
</DialogContent>

      <DialogActions>
        <Button onClick={handlePrint} variant="contained">
          Print
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseDetailsDialog;
