import { Card, CardContent, Grid, Typography } from "@mui/material";

function InventorySummaryCards({ products }) {

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.quantity),
    0
  );

  const totalValue = products.reduce(
    (sum, product) =>
      sum + Number(product.quantity) * Number(product.costPrice),
    0
  );

  const lowStock = products.filter(
    (product) => product.quantity <= product.minimumStock
  ).length;

  const cards = [
    {
      title: "Products",
      value: totalProducts,
    },
    {
      title: "Stock Units",
      value: totalStock,
    },
    {
      title: "Inventory Value",
      value: `₹${totalValue.toFixed(2)}`,
    },
    {
      title: "Low Stock",
      value: lowStock,
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Card
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              border: "1px solid", borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography color="#94a3b8">
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default InventorySummaryCards;

