import {
  CheckCircleOutlineOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

function InventoryAlerts({
  lowStockCount = 0,
  totalProducts = 0,
  supplierCount = 0,
}) {
  const hasLowStock = lowStockCount > 0;

  const alertItems = [
    {
      label: "Low Stock Products",
      description: hasLowStock
        ? "Products require restocking"
        : "No products need attention",
      value: lowStockCount,
      tone: hasLowStock ? "danger" : "success",
      icon: <WarningAmberOutlined />,
    },
    {
      label: "Total Products",
      description: "Products currently registered",
      value: totalProducts,
      tone: "primary",
      icon: <Inventory2Outlined />,
    },
    {
      label: "Active Suppliers",
      description: "Available supplier records",
      value: supplierCount,
      tone: "purple",
      icon: <LocalShippingOutlined />,
    },
  ];

  return (
    <section className="panel inventory-alerts-panel">
      <div className="inventory-alerts-header">
        <div>
          <h2 className="inventory-alerts-title">Inventory Alerts</h2>

          <p className="inventory-alerts-subtitle">
            Current stock and supplier status
          </p>
        </div>

        <div
          className={`inventory-status ${
            hasLowStock ? "inventory-status-warning" : "inventory-status-healthy"
          }`}
        >
          {hasLowStock ? (
            <WarningAmberOutlined fontSize="small" />
          ) : (
            <CheckCircleOutlineOutlined fontSize="small" />
          )}

          <span>{hasLowStock ? "Attention" : "Healthy"}</span>
        </div>
      </div>

      <div className="inventory-alerts-list">
        {alertItems.map((item) => (
          <div className="inventory-alert-card" key={item.label}>
            <div
              className={`inventory-alert-card-icon inventory-alert-card-icon-${item.tone}`}
            >
              {item.icon}
            </div>

            <div className="inventory-alert-card-content">
              <div className="inventory-alert-card-text">
                <span className="inventory-alert-card-label">
                  {item.label}
                </span>

                <span className="inventory-alert-card-description">
                  {item.description}
                </span>
              </div>

              <span
                className={`inventory-alert-card-value inventory-alert-card-value-${item.tone}`}
              >
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InventoryAlerts;