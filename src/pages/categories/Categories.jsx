import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import api from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Categories</Typography>

      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Description</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell sx={{ color: "white" }}>{category.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{category.description}</TableCell>
                  <TableCell>
                    <Chip label={category.status ? "Active" : "Inactive"} color="success" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Categories;