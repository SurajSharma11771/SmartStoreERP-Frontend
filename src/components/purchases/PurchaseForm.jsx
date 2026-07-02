import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function PurchaseForm({
  open,
  onClose,
  suppliers,
  products,
  form,
  handleChange,
  handleItemChange,
  addItem,
  removeItem,
  calculateTotal,
  handleSave,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>New Purchase</DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Supplier"
              name="supplierId"
              value={form.supplierId}
              onChange={handleChange}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Invoice Number"
              name="invoiceNumber"
              value={form.invoiceNumber}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Typography variant="h6" mt={4} mb={2}>
          Purchase Items
        </Typography>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {form.items.map((item, index) => (

                <TableRow key={index}>

                  <TableCell>

                    <TextField
                      select
                      fullWidth
                      value={item.productId}
                      onChange={(e) =>
                        handleItemChange(index, "productId", e.target.value)
                      }
                    >

                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}

                    </TextField>

                  </TableCell>

                  <TableCell>

                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <TextField
                      type="number"
                      value={item.purchasePrice}
                      onChange={(e) =>
                        handleItemChange(index, "purchasePrice", e.target.value)
                      }
                    />

                  </TableCell>

                  <TableCell>

                    ₹
                    {Number(item.quantity || 0) *
                      Number(item.purchasePrice || 0)}

                  </TableCell>

                  <TableCell>

                    <IconButton
                      color="error"
                      onClick={() => removeItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>
        </TableContainer>

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={addItem}
        >
          Add Item
        </Button>

        <Typography variant="h5" mt={3}>
          Total : ₹{calculateTotal()}
        </Typography>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Purchase
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default PurchaseForm;