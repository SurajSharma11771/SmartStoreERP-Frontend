import { Card, CardContent, Grid, Typography } from "@mui/material";

function SaleSummaryCard({ sales }) {

  const totalSales = sales.reduce(
    (sum, sale) => sum + Number(sale.totalAmount),
    0
  );

  const totalOrders = sales.length;

  const averageOrder =
    totalOrders === 0 ? 0 : (totalSales / totalOrders).toFixed(2);

  return (
    <Grid container spacing={2} mt={1}>

      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "#020617", color: "white" }}>
          <CardContent>
            <Typography color="#94a3b8">
              Total Revenue
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              ₹{totalSales}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "#020617", color: "white" }}>
          <CardContent>
            <Typography color="#94a3b8">
              Total Orders
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              {totalOrders}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ bgcolor: "#020617", color: "white" }}>
          <CardContent>
            <Typography color="#94a3b8">
              Average Order
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              ₹{averageOrder}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

export default SaleSummaryCard;