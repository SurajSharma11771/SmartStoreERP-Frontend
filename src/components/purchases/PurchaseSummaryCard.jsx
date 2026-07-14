import { Card, CardContent, Typography } from "@mui/material";

function PurchaseSummaryCard() {
  return (
    <Card className="purchase-mobile-hero">
      <CardContent
className="purchase-mobile-hero-content"
sx={{
py:2,
px:2.5
}}
>
        <Typography
className="purchase-mobile-hero-title"
variant="h6"
>
          Purchase Management
        </Typography>

        <Typography
className="purchase-mobile-hero-text"
variant="body2"
>
          Create purchase entries and automatically increase product stock.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PurchaseSummaryCard;