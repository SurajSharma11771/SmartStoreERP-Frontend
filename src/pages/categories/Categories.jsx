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
  description: "",
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (isEdit) {
      await api.put(`/categories/${selectedCategory.id}`, form);
    } else {
      await api.post("/categories", form);
    }

    setOpenForm(false);
    setForm(initialForm);
    setIsEdit(false);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setForm({
      name: category.name,
      description: category.description || "",
    });
    setIsEdit(true);
    setOpenForm(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    await api.delete(`/categories/${selectedCategory.id}`);
    setDeleteOpen(false);
    fetchCategories();
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Categories"
        buttonText="Add Category"
        onButtonClick={() => {
          setForm(initialForm);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Categories..."
      />

      <TableContainer component={Paper} sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.primary" }}>Name</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Description</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Status</TableCell>
              <TableCell sx={{ color: "text.primary" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell sx={{ color: "text.primary" }}>{category.name}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{category.description}</TableCell>
                <TableCell>
                  <Chip label={category.status ? "Active" : "Inactive"} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(category)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>Are you sure you want to delete this category?</DialogContent>
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

export default Categories;

