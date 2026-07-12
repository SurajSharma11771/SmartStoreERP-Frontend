import {
  DashboardRounded,
  Inventory2Outlined,
  MoreHorizRounded,
  PointOfSaleOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function MobileBottomNav({ onMoreClick }) {
  const getLinkClass = ({ isActive }) =>
    `mobile-nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="mobile-bottom-navigation">
      <NavLink to="/dashboard" className={getLinkClass}>
        <DashboardRounded />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/products" className={getLinkClass}>
        <Inventory2Outlined />
        <span>Products</span>
      </NavLink>

      <NavLink to="/sales" className={getLinkClass}>
        <PointOfSaleOutlined />
        <span>Sales</span>
      </NavLink>

      <NavLink to="/purchases" className={getLinkClass}>
        <ShoppingBagOutlined />
        <span>Purchases</span>
      </NavLink>

      <button
        type="button"
        className="mobile-nav-link"
        onClick={onMoreClick}
      >
        <MoreHorizRounded />
        <span>More</span>
      </button>
    </nav>
  );
}

export default MobileBottomNav;