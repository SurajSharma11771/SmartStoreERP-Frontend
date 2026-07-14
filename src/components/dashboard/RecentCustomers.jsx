import {
  OpenInNewOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function RecentCustomers({ customers = [] }) {
  const navigate = useNavigate();
  const recentCustomers = customers.slice(0, 4);

  return (
    <section className="panel dashboard-list-panel">
      <div className="dashboard-list-header">
        <div>
          <div className="panel-title panel-title-icon">
            <PeopleAltOutlined fontSize="small" />
            Recent Customers
          </div>

          <div className="panel-sub">
            Recently registered customers
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all"
          onClick={() => navigate("/customers")}
        >
          View all
          <OpenInNewOutlined fontSize="inherit" />
        </button>
      </div>

      <div className="dashboard-list">
        {recentCustomers.length === 0 ? (
          <div className="dashboard-empty-state">
            No customers available
          </div>
        ) : (
          recentCustomers.map((customer,index) => (
            <div
              className="dashboard-list-item"
              key={customer.id}
            >
              <div className="dashboard-list-avatar dashboard-list-avatar-green">
                <PeopleAltOutlined />
              </div>

              <div className="dashboard-list-content">
                <div className="dashboard-list-primary">
                  {customer.name}
                </div>

                <div className="dashboard-list-secondary">
                  {customer.phone ||
                    customer.email ||
                    "No contact"}
                </div>
              </div>

              <span className="customer-id-badge">
                #{recentCustomers.length - index}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentCustomers;