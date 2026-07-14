import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalesChart({ chartData }) {
  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height: 300,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Weekly Sales Overview
            </Typography>

            <Typography color="text.secondary" fontSize={14}>
              Sales performance grouped by weekday
            </Typography>
          </Box>

          <Chip
            icon={<TrendingUpIcon />}
            label="Live data"
            color="success"
            size="small"
          />
        </Stack>

        <Box sx={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
  data={chartData}
  margin={{
    top: 0,
    right: 8,
    left: -28,
    bottom: 0,
  }}
>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
  stroke="#64748b"
  width={22}
  tickMargin={2}
  tickLine={false}
  axisLine={false}
  tickFormatter={(value) => `₹${value}`}
/>
              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SalesChart;