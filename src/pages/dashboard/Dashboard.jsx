import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import InventoryAlerts from "../../components/dashboard/InventoryAlerts";
import InfoPanel from "../../components/dashboard/InfoPanel";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    api.get("/dashboard/summary").then((res) => setSummary(res.data.data));
    api.get("/products").then((res) => setProducts(res.data.data.slice(0, 4)));
    api.get("/customers").then((res) => setCustomers(res.data.data.slice(0, 4)));
    api.get("/products/low-stock").then((res) => setLowStockProducts(res.data.data.slice(0, 4)));
  }, []);

  if (!summary) return <LoadingSpinner />;

  const cards = [
    { title: "Products", value: summary.totalProducts, icon: <InventoryIcon />, color: "#2563eb" },
    { title: "Categories", value: summary.totalCategories, icon: <CategoryIcon />, color: "#7c3aed" },
    { title: "Suppliers", value: summary.totalSuppliers, icon: <LocalShippingIcon />, color: "#0891b2" },
    { title: "Customers", value: summary.totalCustomers, icon: <PeopleIcon />, color: "#16a34a" },
    { title: "Low Stock", value: summary.lowStockProducts, icon: <WarningAmberIcon />, color: "#dc2626" },
  ];

  const chartData = [
    { name: "Mon", sales: 12000 },
    { name: "Tue", sales: 18000 },
    { name: "Wed", sales: 9000 },
    { name: "Thu", sales: 22000 },
    { name: "Fri", sales: 16000 },
    { name: "Sat", sales: 26000 },
    { name: "Sun", sales: 20000 },
  ];

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">Dashboard</Typography>
        <Typography color="#94a3b8">Welcome back, Suraj. Here is your business overview.</Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={card.title}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <SalesChart chartData={chartData} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <InventoryAlerts summary={summary} />
        </Grid>

        <Grid item xs={12}>
          <QuickActions />
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoPanel title="Recent Products" items={products.map((p) => p.name)} />
        </Grid>

       <Grid item xs={12} md={4}>
          <InfoPanel title="Recent Customers" items={customers.map((c) => c.name)} />
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoPanel
            title="Low Stock Products"
            items={lowStockProducts.map((p) => `${p.name} - ${p.quantity} left`)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;