import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function ProductForm({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  categories = [],
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const requiredFieldsMissing =
    !String(form.name || "").trim() ||
    !String(form.sku || "").trim() ||
    form.sellingPrice === "" ||
    form.costPrice === "" ||
    form.quantity === "" ||
    form.minimumStock === "" ||
    !form.categoryId;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {isEdit ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Product Name"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="SKU"
              name="sku"
              value={form.sku || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              required
              label="Category"
              name="categoryId"
              value={form.categoryId || ""}
              onChange={handleChange}
            >
              <MenuItem value="">
                Select Category
              </MenuItem>

              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Barcode"
              name="barcode"
              value={form.barcode || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Selling Price"
              name="sellingPrice"
              type="number"
              value={form.sellingPrice}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Cost Price"
              name="costPrice"
              type="number"
              value={form.costPrice}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Minimum Stock"
              name="minimumStock"
              type="number"
              value={form.minimumStock}
              onChange={handleChange}
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={requiredFieldsMissing}
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;