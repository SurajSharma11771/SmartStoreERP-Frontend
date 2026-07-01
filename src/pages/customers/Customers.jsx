import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import api from "../../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.get("/customers").then((res) => setCustomers(res.data.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Customers</Typography>

      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Email</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Phone</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Loyalty Points</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell sx={{ color: "white" }}>{customer.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{customer.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{customer.phone}</TableCell>
                  <TableCell sx={{ color: "white" }}>{customer.loyaltyPoints}</TableCell>
                  <TableCell>
                    <Chip label={customer.status ? "Active" : "Inactive"} color="success" size="small" />
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

export default Customers;