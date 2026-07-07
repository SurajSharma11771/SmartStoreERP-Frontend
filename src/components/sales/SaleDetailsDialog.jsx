import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import InvoiceTemplate from "../invoice/InvoiceTemplate";

function SaleDetailsDialog({ open, onClose, sale }) {
  if (!sale) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Sale Invoice</DialogTitle>

      <DialogContent>
        <InvoiceTemplate invoice={sale} />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>

        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaleDetailsDialog;