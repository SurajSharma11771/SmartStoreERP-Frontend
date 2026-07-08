import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.data));
    api.get("/categories").then((res) => setCategories(res.data.data));
    api.get("/suppliers").then((res) => setSuppliers(res.data.data));
    api.get("/customers").then((res) => setCustomers(res.data.data));
    api.get("/sales").then((res) => setSales(res.data.data));
  }, []);

  const lowStock = products.filter((p) => p.quantity <= p.minimumStock);

  const totalSales = sales.reduce(
    (sum, sale) => sum + Number(sale.netAmount || sale.totalAmount || 0),
    0
  );

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklySales = weekDays.map((day, index) => {
    const total = sales
      .filter((sale) => new Date(sale.saleDate).getDay() === index)
      .reduce(
        (sum, sale) => sum + Number(sale.netAmount || sale.totalAmount || 0),
        0
      );

    return { day, total };
  });

  const maxWeeklySale = Math.max(...weeklySales.map((item) => item.total), 1);

  return (
    <>
      <div className="dashboard-grid-top">
        <StatCard icon="🛍" title="Total Products" value={products.length} bg="#eff6ff" />
        <StatCard icon="▦" title="Total Categories" value={categories.length} bg="#f3e8ff" />
        <StatCard icon="🚚" title="Total Suppliers" value={suppliers.length} bg="#dcfce7" />
        <StatCard icon="👥" title="Total Customers" value={customers.length} bg="#ffedd5" />
        <StatCard icon="⚠" title="Low Stock Items" value={lowStock.length} bg="#fee2e2" />
      </div>

      <div className="dashboard-row">
        <div className="panel">
          <div className="panel-title">📈 Weekly Sales Overview</div>
          <div className="panel-sub">Real sales performance by weekday</div>

          <div className="fake-chart">
            {weeklySales.map((item) => {
              const height = item.total === 0 ? 8 : (item.total / maxWeeklySale) * 220;

              return (
                <div key={item.day} style={{ textAlign: "center" }}>
                  <div
                    className="bar"
                    title={`₹${item.total}`}
                    style={{ height }}
                  />
                  <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                    {item.day}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>
                    ₹{item.total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">📦 Inventory Alerts</div>

          <AlertRow label="Low Stock Products" value={lowStock.length} red />
          <AlertRow label="Total Products" value={products.length} />
          <AlertRow label="Active Suppliers" value={suppliers.length} />
        </div>

        <div className="panel">
          <div className="panel-title">⚡ Quick Actions</div>

          <div className="quick-grid">
            <button className="quick-btn" onClick={() => navigate("/products")}>
              <div className="quick-icon" style={{ background: "#eff6ff" }}>🛍</div>
              Add Product
            </button>

            <button className="quick-btn" onClick={() => navigate("/categories")}>
              <div className="quick-icon" style={{ background: "#f3e8ff" }}>▦</div>
              Add Category
            </button>

            <button className="quick-btn" onClick={() => navigate("/suppliers")}>
              <div className="quick-icon" style={{ background: "#dcfce7" }}>🚚</div>
              Add Supplier
            </button>

            <button className="quick-btn" onClick={() => navigate("/customers")}>
              <div className="quick-icon" style={{ background: "#ffedd5" }}>👥</div>
              Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="panel">
          <div className="panel-title">📦 Recent Products</div>

          {products.slice(0, 2).map((product) => (
            <div className="mini-item" key={product.id}>
              <div>{product.name}</div>
              <div className="pill" style={{ background: "#eff6ff", color: "#2563eb" }}>
                {product.sku}
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-title">👥 Recent Customers</div>

          {customers.slice(0, 2).map((customer) => (
            <div className="mini-item" key={customer.id}>
              <div>{customer.name}</div>
              <div className="pill" style={{ background: "#dcfce7", color: "#16a34a" }}>
                {customer.id}
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-title">⚠ Low Stock Products</div>

          <div
            className="pill"
            style={{
              background: lowStock.length === 0 ? "#dcfce7" : "#fee2e2",
              color: lowStock.length === 0 ? "#16a34a" : "#dc2626",
              display: "inline-block",
              marginTop: 24,
              fontWeight: 700,
            }}
          >
            {lowStock.length === 0
              ? "✔ All products are well stocked"
              : `⚠ ${lowStock.length} product(s) need attention`}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, title, value, bg }) {
  return (
    <div className="dashboard-card stat-card">
      <div className="stat-icon" style={{ background: bg }}>{icon}</div>

      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>

        <div className="stat-footer">
          <span style={{ color: "#16a34a", fontWeight: 900 }}>Live</span>{" "}
          business data
        </div>
      </div>
    </div>
  );
}

function AlertRow({ label, value, red }) {
  return (
    <div className="alert-row">
      <span>{label}</span>
      <span
        className="badge"
        style={{
          background: red ? "#fee2e2" : "#dbeafe",
          color: red ? "#ef4444" : "#2563eb",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Dashboard;