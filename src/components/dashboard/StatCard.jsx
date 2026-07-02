import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material";

function StatCard({ title, value, icon, color }) {
  return (
    <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b", borderRadius: 3, minHeight: 135 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="#94a3b8" fontSize={14}>{title}</Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>{value}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
        </Stack>
        <Typography color="#64748b" fontSize={13} mt={2}>Updated just now</Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;