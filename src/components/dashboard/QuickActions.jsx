import {
  CategoryOutlined,
  GroupsOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Product",
      subtitle: "Add inventory item",
      icon: <Inventory2Outlined />,
      route: "/products",
      color: "blue",
    },
    {
      title: "New Category",
      subtitle: "Create category",
      icon: <CategoryOutlined />,
      route: "/categories",
      color: "purple",
    },
    {
      title: "New Supplier",
      subtitle: "Register supplier",
      icon: <LocalShippingOutlined />,
      route: "/suppliers",
      color: "green",
    },
    {
      title: "New Customer",
      subtitle: "Create customer",
      icon: <GroupsOutlined />,
      route: "/customers",
      color: "orange",
    },
  ];

  return (
    <section className="panel">
      <div className="panel-title">Quick Actions</div>

      <div className="panel-sub">
        Frequently used shortcuts
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <button
            key={action.title}
            className="quick-action-card"
            onClick={() => navigate(action.route)}
          >
            <div className={`quick-action-icon ${action.color}`}>
              {action.icon}
            </div>

            <div className="quick-action-text">
              <span>{action.title}</span>
              <small>{action.subtitle}</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;