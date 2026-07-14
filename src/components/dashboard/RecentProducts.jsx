import {
  Inventory2Outlined,
  OpenInNewOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function RecentProducts({ products = [] }) {
  const navigate = useNavigate();
  const recentProducts = [...products].reverse().slice(0, 4);

  return (
    <section className="panel dashboard-list-panel">
      <div className="dashboard-list-header">
        <div>
          <div className="panel-title panel-title-icon">
            <Inventory2Outlined fontSize="small" />
            Recent Products
          </div>

          <div className="panel-sub">
            Recently added inventory items
          </div>
        </div>

        <button
          type="button"
          className="dashboard-view-all"
          onClick={() => navigate("/products")}
        >
          View all
          <OpenInNewOutlined fontSize="inherit" />
        </button>
      </div>

      <div className="dashboard-list">
        {recentProducts.length === 0 ? (
          <div className="dashboard-empty-state">
            No products available
          </div>
        ) : (
          recentProducts.map((product) => {
            const quantity = Number(product.quantity || 0);
            const minimumStock = Number(product.minimumStock || 0);
            const isLowStock = quantity <= minimumStock;

            return (
              <div className="dashboard-list-item" key={product.id}>
                <div className="dashboard-list-avatar dashboard-list-avatar-blue">
                  <Inventory2Outlined />
                </div>

                <div className="dashboard-list-content">
                  <div className="dashboard-list-primary">
                    {product.name}
                  </div>

                  <div className="dashboard-list-secondary">
                    SKU: {product.sku || "Not assigned"}
                  </div>
                </div>

                <div className="dashboard-list-meta">
                  <span
                    className={`stock-status ${
                      isLowStock ? "stock-status-low" : "stock-status-healthy"
                    }`}
                  >
                    {quantity} in stock
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentProducts;