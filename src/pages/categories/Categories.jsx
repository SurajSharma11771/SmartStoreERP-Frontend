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

  const {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar,
  } = useAppSnackbar();

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      showError("Unable to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await api.put(
          `/categories/${selectedCategory.id}`,
          form
        );

        showSuccess("Category updated successfully!");
      } else {
        await api.post("/categories", form);
        showSuccess("Category added successfully!");
      }

      setOpenForm(false);
      setForm(initialForm);
      setIsEdit(false);
      setSelectedCategory(null);

      await fetchCategories();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to save category."
      );
    }
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
    if (!selectedCategory) return;

    try {
      await api.delete(
        `/categories/${selectedCategory.id}`
      );

      showSuccess("Category deleted successfully!");

      setDeleteOpen(false);
      setSelectedCategory(null);

      await fetchCategories();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message ||
          "Unable to delete category."
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Categories"
        buttonText="Add Category"
        onButtonClick={() => {
          setForm(initialForm);
          setSelectedCategory(null);
          setIsEdit(false);
          setOpenForm(true);
        }}
      />

      <SearchToolbar
        value={search}
        onChange={setSearch}
        placeholder="Search Categories..."
      />

      <Box className="desktop-data-table">
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>
                  Name
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Description
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
              {filteredCategories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {category.name}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {category.description || "—"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        category.status
                          ? "Active"
                          : "Inactive"
                      }
                      color={
                        category.status
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(category)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteClick(category)
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
        {filteredCategories.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No categories found.
            </Typography>
          </Paper>
        ) : (
          filteredCategories.map((category) => (
            <Paper
              key={category.id}
              className="mobile-data-card"
              elevation={0}
            >
              <Box className="mobile-data-card-header">
                <Typography className="mobile-data-card-title">
                  {category.name}
                </Typography>

                <Chip
                  label={
                    category.status ? "Active" : "Inactive"
                  }
                  color={
                    category.status ? "success" : "error"
                  }
                  size="small"
                />
              </Box>

              <Typography className="mobile-data-label">
                Description
              </Typography>

              <Typography className="mobile-data-value">
                {category.description || "—"}
              </Typography>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(category)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    handleDeleteClick(category)
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
          {isEdit ? "Edit Category" : "Add Category"}
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
            label="Category Name"
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
            label="Description"
            value={form.description}
            onChange={(event) =>
              setForm({
                ...form,
                description: event.target.value,
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
        <DialogTitle>Delete Category</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this category?
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

export default Categories;