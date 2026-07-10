import { useEffect, useState } from "react";
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader";
import SearchToolbar from "../../components/common/SearchToolbar";

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
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchSuppliers = async () => {
    const res = await api.get("/suppliers");
    setSuppliers(res.data.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSave = async () => {
    if (isEdit) {
      await api.put(`/suppliers/${selectedSupplier.id}`, form);
    } else {
      await api.post("/suppliers", form);
    }

    setOpenForm(false);
    setForm(initialForm);
    setIsEdit(false);
    fetchSuppliers();
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
    await api.delete(`/suppliers/${selectedSupplier.id}`);
    setDeleteOpen(false);
    fetchSuppliers();
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <Box>
      <PageHeader
        title="Suppliers"
        buttonText="Add Supplier"
        onButtonClick={() => {
          setForm(initialForm);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Suppliers..."
      />

      <TableContainer component={Paper} sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.primary" }}>Name</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Email</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Phone</TableCell>
              <TableCell sx={{ color: "text.primary" }}>GST</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Status</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell sx={{ color: "text.primary" }}>{supplier.name}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{supplier.email}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{supplier.phone}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{supplier.gstNumber}</TableCell>
                <TableCell>
                  <Chip label={supplier.status ? "Active" : "Inactive"} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(supplier)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(supplier)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit Supplier" : "Add Supplier"}</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Supplier Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
          <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
          <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
          <TextField label="GST Number" value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} fullWidth />
          <TextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} fullWidth multiline rows={3} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Supplier</DialogTitle>
        <DialogContent>Are you sure you want to delete this supplier?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Suppliers;

