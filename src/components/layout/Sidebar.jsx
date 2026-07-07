import { NavLink } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import WarehouseIcon from "@mui/icons-material/Warehouse";
const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Products", path: "/products", icon: <InventoryIcon /> },
  { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  { text: "Suppliers", path: "/suppliers", icon: <LocalShippingIcon /> },
  { text: "Customers", path: "/customers", icon: <PeopleIcon /> },
  { text: "Purchases", path: "/purchases", icon: <ShoppingCartIcon /> },
  {text: "Sales",path: "/sales",icon: <PointOfSaleIcon />,},
  {text: "Inventory",path: "/inventory",icon: <WarehouseIcon />,},
];

function Sidebar({ drawerWidth }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#020617",
          color: "white",
          borderRight: "1px solid #1e293b",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          SmartStore
        </Typography>
        <Typography variant="body2" color="#94a3b8">
          ERP System
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              color: "#cbd5e1",
              "&.active": {
                bgcolor: "#2563eb",
                color: "white",
              },
              "&:hover": {
                bgcolor: "#1e293b",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;