import { Card, CardContent, Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Add Product", path: "/products" },
    { label: "Add Category", path: "/categories" },
    { label: "Add Supplier", path: "/suppliers" },
    { label: "Add Customer", path: "/customers" },
  ];

  return (
    <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.label}>
              <Button fullWidth variant="contained" onClick={() => navigate(action.path)}>
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default QuickActions;