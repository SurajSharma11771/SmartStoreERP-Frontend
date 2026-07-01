import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import api from "../../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    api.get("/suppliers").then((res) => setSuppliers(res.data.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Suppliers</Typography>

      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Email</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Phone</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>GST</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell sx={{ color: "white" }}>{supplier.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{supplier.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{supplier.phone}</TableCell>
                  <TableCell sx={{ color: "white" }}>{supplier.gstNumber}</TableCell>
                  <TableCell>
                    <Chip label={supplier.status ? "Active" : "Inactive"} color="success" size="small" />
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

export default Suppliers;