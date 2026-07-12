import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const menuItems = [
  { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { text: "Products", path: "/products", icon: <Inventory2Icon /> },
  { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
  { text: "Suppliers", path: "/suppliers", icon: <LocalShippingIcon /> },
  { text: "Customers", path: "/customers", icon: <GroupsIcon /> },
  { text: "Purchases", path: "/purchases", icon: <ShoppingCartIcon /> },
  { text: "Sales", path: "/sales", icon: <PointOfSaleIcon /> },
  { text: "Inventory", path: "/inventory", icon: <WarehouseIcon /> },
];

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="logo-box">
        <div className="logo-title">
          Smart<span>Store</span>
        </div>
        <div className="logo-subtitle">ERP System</div>
      </div>

      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}  
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          {item.icon}
          {item.text}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
