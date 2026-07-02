import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

function InventoryAlerts({ summary }) {
  const items = [
    ["Low Stock Products", summary.lowStockProducts, "error"],
    ["Total Products", summary.totalProducts, "primary"],
    ["Active Suppliers", summary.totalSuppliers, "info"],
  ];

  return (
    <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b", borderRadius: 3, height: 360 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>Inventory Alerts</Typography>
        <Typography color="#94a3b8" fontSize={14} mb={3}>Low stock and inventory signals</Typography>

        <Stack spacing={2}>
          {items.map(([title, value, color]) => (
            <Box key={title}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>{title}</Typography>
                <Chip label={value} color={color} size="small" />
              </Stack>
              <Divider sx={{ bgcolor: "#1e293b", mt: 2 }} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InventoryAlerts;