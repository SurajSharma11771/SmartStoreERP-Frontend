import { Box, Card, CardContent, Typography } from "@mui/material";

function PurchaseStats({ purchases }) {
  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.totalAmount || 0),
    0
  );

  const today = new Date().toDateString();

  const todayPurchases = purchases.filter(
    (purchase) =>
      new Date(purchase.purchaseDate).toDateString() === today
  ).length;

  const cards = [
    {
      title: "Total Purchases",
      value: totalPurchases,
      color: "#2563eb",
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      color: "#16a34a",
    },
    {
      title: "Today's Purchases",
      value: todayPurchases,
      color: "#dc2626",
    },
  ];

  return (
    <Box className="purchase-stats-grid">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="purchase-summary-card"
        >
          <CardContent className="purchase-summary-content">
            <Typography className="purchase-summary-title">
              {card.title}
            </Typography>

            <Typography
              className="purchase-summary-value"
              sx={{ color: card.color }}
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default PurchaseStats;