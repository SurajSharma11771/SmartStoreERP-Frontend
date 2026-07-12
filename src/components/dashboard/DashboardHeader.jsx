import {
  CalendarMonthOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

function DashboardHeader({ totalSales }) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="dashboard-header">
      <div>
        <div className="dashboard-eyebrow">SMARTSTORE ERP</div>

        <h1 className="dashboard-heading">
          Dashboard Overview
        </h1>
        <div className="dashboard-date">
          <CalendarMonthOutlined fontSize="small" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="sales-summary-card">
        <div className="sales-summary-icon">
          <TrendingUpOutlined />
        </div>

        <div>
          <div className="sales-summary-label">
            Total Sales
          </div>

          <div className="sales-summary-value">
            ₹{Number(totalSales || 0).toLocaleString("en-IN")}
          </div>

          <div className="sales-summary-caption">
            Based on recorded transactions
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;