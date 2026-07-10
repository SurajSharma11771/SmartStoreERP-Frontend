import { Card, CardContent, Typography } from "@mui/material";

function PurchaseSummaryCard() {
  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        border: "1px solid", borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Purchase Management
        </Typography>

        <Typography color="#94a3b8" mt={1}>
          Create purchase entries and automatically increase product stock.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PurchaseSummaryCard;

