import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Products
      </Typography>

      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>SKU</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Selling Price</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.sku}</TableCell>
                  <TableCell sx={{ color: "white" }}>₹{product.sellingPrice}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.quantity}</TableCell>
                  <TableCell>
                    <Chip label={product.status ? "Active" : "Inactive"} color="success" size="small" />
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

export default Products;