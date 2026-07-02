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
};

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSave = async () => {
    if (isEdit) {
      await api.put(`/customers/${selectedCustomer.id}`, form);
    } else {
      await api.post("/customers", form);
    }

    setOpenForm(false);
    setForm(initialForm);
    setIsEdit(false);
    fetchCustomers();
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
    await api.delete(`/customers/${selectedCustomer.id}`);
    setDeleteOpen(false);
    fetchCustomers();
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <Box>
      <PageHeader
        title="Customers"
        buttonText="Add Customer"
        onButtonClick={() => {
          setForm(initialForm);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Customers..."
      />

      <TableContainer component={Paper} sx={{ bgcolor: "#020617", border: "1px solid #1e293b" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Points</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell sx={{ color: "white" }}>{customer.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{customer.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{customer.phone}</TableCell>
                <TableCell sx={{ color: "white" }}>{customer.address}</TableCell>
                <TableCell sx={{ color: "white" }}>{customer.loyaltyPoints}</TableCell>
                <TableCell>
                  <Chip label={customer.status ? "Active" : "Inactive"} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(customer)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(customer)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit Customer" : "Add Customer"}</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Customer Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
          <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
          <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
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
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>Are you sure you want to delete this customer?</DialogContent>
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

export default Customers;