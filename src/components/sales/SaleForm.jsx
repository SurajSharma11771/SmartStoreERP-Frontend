import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function SaleForm({
  open,
  onClose,
  customers,
  products,
  form,
  handleChange,
  handleItemChange,
  addItem,
  removeItem,
  calculateTotal,
  handleSave,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          width: {
            xs: "calc(100% - 20px)",
            sm: "calc(100% - 48px)",
          },
          maxHeight: {
            xs: "calc(100dvh - 20px)",
            sm: "calc(100dvh - 48px)",
          },
          m: {
            xs: "10px",
            sm: "24px",
          },
          borderRadius: {
            xs: 3,
            sm: 4,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          pt: {
            xs: 2,
            sm: 3,
          },
          pb: 1.5,
          fontSize: {
            xs: 22,
            sm: 26,
          },
          fontWeight: 800,
        }}
      >
        New Sale
      </DialogTitle>

      <DialogContent
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            select
            fullWidth
            size="small"
            label="Customer"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            size="small"
             required
            label="Invoice Number"
            name="invoiceNumber"
            value={form.invoiceNumber}
            onChange={handleChange}
          />
        </Box>

        <Typography
          sx={{
            mt: 2.5,
            mb: 1.25,
            fontSize: {
              xs: 18,
              sm: 20,
            },
            fontWeight: 800,
          }}
        >
          Sale Items
        </Typography>

        {isMobile ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {form.items.map((item, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography fontWeight={800}>
                    Item {index + 1}
                  </Typography>

                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => removeItem(index)}
                    aria-label="Remove sale item"
                    disabled={form.items.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Product"
                  value={item.productId}
                  onChange={(event) =>
                    handleItemChange(
                      index,
                      "productId",
                      event.target.value
                    )
                  }
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} — Stock: {product.quantity}
                    </MenuItem>
                  ))}
                </TextField>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1.25,
                    mt: 1.5,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    inputProps={{ min: 1 }}
                    onChange={(event) =>
                      handleItemChange(
                        index,
                        "quantity",
                        event.target.value
                      )
                    }
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Selling Price"
                    value={item.sellingPrice}
                    inputProps={{ min: 0 }}
                    onChange={(event) =>
                      handleItemChange(
                        index,
                        "sellingPrice",
                        event.target.value
                      )
                    }
                  />
                </Box>

                <Box
                  sx={{
                    mt: 1.5,
                    pt: 1.25,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    Item Total
                  </Typography>

                  <Typography fontSize={18} fontWeight={800}>
                    ₹
                    {(
                      Number(item.quantity || 0) *
                      Number(item.sellingPrice || 0)
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderRadius: 2.5,
              overflowX: "auto",
            }}
          >
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 190, fontWeight: 800 }}>
                    Product
                  </TableCell>
                  <TableCell sx={{ width: 90, fontWeight: 800 }}>
                    Qty
                  </TableCell>
                  <TableCell sx={{ width: 130, fontWeight: 800 }}>
                    Selling Price
                  </TableCell>
                  <TableCell sx={{ width: 100, fontWeight: 800 }}>
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: 70, fontWeight: 800 }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {form.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={item.productId}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            "productId",
                            event.target.value
                          )
                        }
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            {product.name} — Stock: {product.quantity}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>

                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={item.quantity}
                        inputProps={{ min: 1 }}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            "quantity",
                            event.target.value
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={item.sellingPrice}
                        inputProps={{ min: 0 }}
                        onChange={(event) =>
                          handleItemChange(
                            index,
                            "sellingPrice",
                            event.target.value
                          )
                        }
                      />
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>
                      ₹
                      {(
                        Number(item.quantity || 0) *
                        Number(item.sellingPrice || 0)
                      ).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => removeItem(index)}
                        aria-label="Remove sale item"
                        disabled={form.items.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 1.5,
          }}
        >
          <Button variant="outlined" onClick={addItem}>
            Add Item
          </Button>

          <Typography
            sx={{
              fontSize: {
                xs: 22,
                sm: 25,
              },
              fontWeight: 800,
            }}
          >
            Total: ₹{Number(calculateTotal() || 0).toLocaleString("en-IN")}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          pt: 1,
          pb: {
            xs: 2,
            sm: 3,
          },
          gap: 1,
        }}
      >
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            minHeight: 42,
            px: 2.5,
            borderRadius: 2.5,
          }}
        >
          Save Sale
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaleForm;