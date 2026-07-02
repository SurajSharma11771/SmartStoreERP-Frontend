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

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary").then((res) => {
      setSummary(res.data.data);
    });
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
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography color="#94a3b8">
          Welcome back, Suraj. Here is your business overview.
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={card.title}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalesChart chartData={chartData} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <InventoryAlerts summary={summary} />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoPanel
            title="Recent Products"
            items={["Milk 1L", "Rice 5KG", "Sugar 1KG", "Bread Pack"]}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoPanel
            title="Recent Customers"
            items={["Rahul Customer", "Amit Sharma", "Priya Verma", "Local Walk-in"]}
          />
        </Grid>
      </Grid>
    </Box>
  );
} 
export default Dashboard;