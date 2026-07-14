import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../../services/api";

import PageHeader from "../../components/common/PageHeader";
import SearchToolbar from "../../components/common/SearchToolbar";
import AppSnackbar from "../../components/common/AppSnackbar";

import useAppSnackbar from "../../hooks/useAppSnackbar";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar,
  } = useAppSnackbar();

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data.data);
    } catch (error) {
      console.error(error);
      showError("Unable to load customers.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await api.put(
          `/customers/${selectedCustomer.id}`,
          form
        );

        showSuccess("Customer updated successfully!");
      } else {
        await api.post("/customers", form);
        showSuccess("Customer added successfully!");
      }

      setOpenForm(false);
      setForm(initialForm);
      setIsEdit(false);
      setSelectedCustomer(null);

      await fetchCustomers();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to save customer."
      );
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);

    setForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });

    setIsEdit(true);
    setOpenForm(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await api.delete(
        `/customers/${selectedCustomer.id}`
      );

      showSuccess("Customer deleted successfully!");

      setDeleteOpen(false);
      setSelectedCustomer(null);

      await fetchCustomers();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to delete customer."
      );
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Customers"
        buttonText="Add Customer"
        onButtonClick={() => {
          setForm(initialForm);
          setSelectedCustomer(null);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Customers..."
      />

      <Box className="desktop-data-table">
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 850 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>
                  Name
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Email
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Phone
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Address
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Points
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Status
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {customer.name}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {customer.email || "—"}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {customer.phone || "—"}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {customer.address || "—"}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {customer.loyaltyPoints ?? 0}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        customer.status
                          ? "Active"
                          : "Inactive"
                      }
                      color={
                        customer.status
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(customer)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteClick(customer)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="mobile-data-list">
        {filteredCustomers.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No customers found.
            </Typography>
          </Paper>
        ) : (
          filteredCustomers.map((customer) => (
            <Paper
              key={customer.id}
              className="mobile-data-card"
              elevation={0}
            >
              <Box className="mobile-data-card-header">
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="mobile-data-card-title">
                    {customer.name}
                  </Typography>

                  <Typography className="mobile-data-label">
                    {customer.email || "No email"}
                  </Typography>
                </Box>

                <Chip
                  label={
                    customer.status ? "Active" : "Inactive"
                  }
                  color={
                    customer.status ? "success" : "error"
                  }
                  size="small"
                />
              </Box>

              <Box className="mobile-data-card-grid">
                <Box>
                  <Typography className="mobile-data-label">
                    Phone
                  </Typography>

                  <Typography className="mobile-data-value">
                    {customer.phone || "—"}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Loyalty Points
                  </Typography>

                  <Typography className="mobile-data-value">
                    {customer.loyaltyPoints ?? 0}
                  </Typography>
                </Box>

                <Box sx={{ gridColumn: "1 / -1" }}>
                  <Typography className="mobile-data-label">
                    Address
                  </Typography>

                  <Typography className="mobile-data-value">
                    {customer.address || "—"}
                  </Typography>
                </Box>
              </Box>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(customer)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    handleDeleteClick(customer)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEdit ? "Edit Customer" : "Add Customer"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Customer Name"
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Phone"
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Address"
            value={form.address}
            onChange={(event) =>
              setForm({
                ...form,
                address: event.target.value,
              })
            }
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <DialogTitle>Delete Customer</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this customer?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default Customers;