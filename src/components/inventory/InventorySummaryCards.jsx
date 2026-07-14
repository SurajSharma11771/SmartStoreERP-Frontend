import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function InventorySummaryCards({ products }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.quantity || 0),
    0
  );

  const totalValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.quantity || 0) *
        Number(product.costPrice || 0),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.quantity || 0) <=
      Number(product.minimumStock || 0)
  ).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      color: "#2563eb",
    },
    {
      title: "Stock Units",
      value: totalStock.toLocaleString("en-IN"),
      color: "#2563eb",
    },
    {
      title: "Inventory Value",
      value: `₹${totalValue.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      color: "#16a34a",
    },
    {
      title: "Low Stock",
      value: lowStock,
      color: lowStock > 0 ? "#dc2626" : "#16a34a",
    },
  ];

  return (
    <Box className="inventory-stats-grid">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="inventory-summary-card"
        >
          <CardContent className="inventory-summary-content">
            <Typography className="inventory-summary-title">
              {card.title}
            </Typography>

            <Typography
              className="inventory-summary-value"
              sx={{
                color: `${card.color} !important`,
              }}
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default InventorySummaryCards;