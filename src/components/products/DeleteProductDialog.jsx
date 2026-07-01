import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeleteProductDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this product?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProductDialog;