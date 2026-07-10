import { Card, CardContent, Grid, Typography } from "@mui/material";

function PurchaseStats({ purchases }) {

  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.totalAmount),
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
      value: `₹${totalAmount.toLocaleString()}`,
      color: "#16a34a",
    },
    {
      title: "Today's Purchases",
      value: todayPurchases,
      color: "#dc2626",
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>

      {cards.map((card) => (

        <Grid item xs={12} md={4} key={card.title}>

          <Card
            sx={{
              bgcolor: "background.paper",
              border: "1px solid", borderColor: "divider",
              color: "text.primary",
            }}
          >

            <CardContent>

              <Typography color="#94a3b8">
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: card.color }}
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

export default PurchaseStats;

