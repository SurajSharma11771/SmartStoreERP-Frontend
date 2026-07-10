import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function SalesChart({ chartData }) {
  return (
    <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b", borderRadius: 3, height: 300 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6" fontWeight="bold">Weekly Sales Overview</Typography>
            <Typography color="#94a3b8" fontSize={14}>Demo analytics preview</Typography>
          </Box>
          <Chip icon={<TrendingUpIcon />} label="+12.5%" color="success" size="small" />
        </Stack>

        <Box sx={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SalesChart;
