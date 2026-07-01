import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Grid
} from "@mui/material";
import api from "../../services/api";

const initialForm = {
  name: "",
  sku: "",
  barcode: "",
  description: "",
  sellingPrice: "",
  costPrice: "",
  quantity: "",
  minimumStock: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const fetchProducts = () => {
    api.get("/products").then((res) => {
      setProducts(res.data.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await api.post("/products", {
      ...form,
      sellingPrice: Number(form.sellingPrice),
      costPrice: Number(form.costPrice),
      quantity: Number(form.quantity),
      minimumStock: Number(form.minimumStock),
    });

    setOpen(false);
    setForm(initialForm);
    fetchProducts();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </Box>

      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>SKU</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Selling Price</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.sku}</TableCell>
                  <TableCell sx={{ color: "white" }}>₹{product.sellingPrice}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.quantity}</TableCell>
                  <TableCell>
                    <Chip label={product.status ? "Active" : "Inactive"} color="success" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.keys(initialForm).map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Products;