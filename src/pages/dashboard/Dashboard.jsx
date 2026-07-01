import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import api from "../../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary").then((res) => {
      setSummary(res.data.data);
    });
  }, []);

  if (!summary) return <Typography>Loading dashboard...</Typography>;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <StatCard title="Products" value={summary.totalProducts} />
        <StatCard title="Categories" value={summary.totalCategories} />
        <StatCard title="Suppliers" value={summary.totalSuppliers} />
        <StatCard title="Customers" value={summary.totalCustomers} />
        <StatCard title="Low Stock" value={summary.lowStockProducts} />
      </Grid>
    </Box>
  );
}

function StatCard({ title, value }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b" }}>
        <CardContent>
          <Typography color="#94a3b8">{title}</Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Dashboard;