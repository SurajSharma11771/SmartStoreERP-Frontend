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
  gstNumber: "",
};

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] =
    useState(null);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar,
  } = useAppSnackbar();

  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/suppliers");
      setSuppliers(res.data.data);
    } catch (error) {
      console.error(error);
      showError("Unable to load suppliers.");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await api.put(
          `/suppliers/${selectedSupplier.id}`,
          form
        );

        showSuccess("Supplier updated successfully!");
      } else {
        await api.post("/suppliers", form);
        showSuccess("Supplier added successfully!");
      }

      setOpenForm(false);
      setForm(initialForm);
      setIsEdit(false);
      setSelectedSupplier(null);

      await fetchSuppliers();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to save supplier."
      );
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);

    setForm({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
      gstNumber: supplier.gstNumber || "",
    });

    setIsEdit(true);
    setOpenForm(true);
  };

  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedSupplier) return;

    try {
      await api.delete(
        `/suppliers/${selectedSupplier.id}`
      );

      showSuccess("Supplier deleted successfully!");

      setDeleteOpen(false);
      setSelectedSupplier(null);

      await fetchSuppliers();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to delete supplier."
      );
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Suppliers"
        buttonText="Add Supplier"
        onButtonClick={() => {
          setForm(initialForm);
          setSelectedSupplier(null);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Suppliers..."
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
          <Table sx={{ minWidth: 760 }}>
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
                  GST
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
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {supplier.name}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {supplier.email || "—"}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {supplier.phone || "—"}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {supplier.gstNumber || "—"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        supplier.status
                          ? "Active"
                          : "Inactive"
                      }
                      color={
                        supplier.status
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(supplier)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteClick(supplier)
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
        {filteredSuppliers.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No suppliers found.
            </Typography>
          </Paper>
        ) : (
          filteredSuppliers.map((supplier) => (
            <Paper
              key={supplier.id}
              className="mobile-data-card"
              elevation={0}
            >
              <Box className="mobile-data-card-header">
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="mobile-data-card-title">
                    {supplier.name}
                  </Typography>

                  <Typography className="mobile-data-label">
                    {supplier.email || "No email"}
                  </Typography>
                </Box>

                <Chip
                  label={
                    supplier.status ? "Active" : "Inactive"
                  }
                  color={
                    supplier.status ? "success" : "error"
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
                    {supplier.phone || "—"}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    GST Number
                  </Typography>

                  <Typography className="mobile-data-value">
                    {supplier.gstNumber || "—"}
                  </Typography>
                </Box>

                <Box sx={{ gridColumn: "1 / -1" }}>
                  <Typography className="mobile-data-label">
                    Address
                  </Typography>

                  <Typography className="mobile-data-value">
                    {supplier.address || "—"}
                  </Typography>
                </Box>
              </Box>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(supplier)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    handleDeleteClick(supplier)
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
          {isEdit ? "Edit Supplier" : "Add Supplier"}
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
            label="Supplier Name"
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
            label="GST Number"
            value={form.gstNumber}
            onChange={(event) =>
              setForm({
                ...form,
                gstNumber: event.target.value,
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
        <DialogTitle>Delete Supplier</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this supplier?
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

export default Suppliers;