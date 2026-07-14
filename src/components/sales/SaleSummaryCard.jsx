import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function SaleSummaryCard({ sales }) {
  const totalSales = sales.reduce(
    (sum, sale) => sum + Number(sale.totalAmount || 0),
    0
  );

  const totalOrders = sales.length;

  const averageOrder =
    totalOrders === 0
      ? 0
      : totalSales / totalOrders;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalSales.toLocaleString("en-IN")}`,
      color: "#2563eb",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      color: "#2563eb",
    },
    {
      title: "Average Order",
      value: `₹${averageOrder.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      color: "#16a34a",
    },
  ];

  return (
    <Box className="sales-stats-grid">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="sales-summary-card"
        >
          <CardContent className="sales-summary-content">
            <Typography className="sales-summary-title">
              {card.title}
            </Typography>

            <Typography
              className="sales-summary-value"
              sx={{ color: `${card.color} !important` }}
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default SaleSummaryCard;