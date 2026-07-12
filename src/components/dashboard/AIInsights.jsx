import {
  AutoAwesomeOutlined,
  TrendingUpOutlined,
  WarningAmberOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";

function AIInsights({
  totalSales = 0,
  lowStock = 0,
  totalProducts = 0,
}) {
  const insights = [];

  if (totalSales > 0) {
    insights.push({
      icon: <TrendingUpOutlined />,
      text: `Today's recorded sales: ₹${totalSales}`,
      tone: "blue",
    });
  }

  if (lowStock > 0) {
    insights.push({
      icon: <WarningAmberOutlined />,
      text:
  lowStock === 1
    ? "1 product requires restocking"
    : `${lowStock} products require restocking`,
      tone: "red",
    });
  }

  if (totalProducts > 0) {
    insights.push({
      icon: <Inventory2Outlined />,
      text:
  totalProducts === 1
    ? "1 product currently you have"
    : `${totalProducts} products currently you have`,
      tone: "green",
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: <AutoAwesomeOutlined />,
      text: "Business data will appear after transactions.",
      tone: "blue",
    });
  }

  return (
    <section className="panel ai-panel">
      <div className="panel-title panel-title-icon">
        <AutoAwesomeOutlined fontSize="small" />
        AI Business Insights
      </div>

      <div className="panel-sub">
        Smart recommendations based on your business data
      </div>

      <div className="ai-list">
        {insights.map((item, index) => (
          <div className={`ai-item ${item.tone}`} key={index}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIInsights;