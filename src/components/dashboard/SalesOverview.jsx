import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalesOverview({ data }) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <div className="panel sales-overview-panel">
      <div className="panel-heading-row">
        <div>
          <div className="panel-title">Weekly Sales Overview</div>
          <div className="panel-sub">
            Sales performance grouped by weekday
          </div>
        </div>

        <span className="panel-status">Live data</span>
      </div>

      <div className="sales-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
  top: 16,
  right: 12,
  left: -12,
  bottom: 0,
}}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--muted)",
                fontSize: 12,
              }}
            />

            <YAxis
  axisLine={false}
  tickLine={false}
  width={42}
  dx={-6}
  tickMargin={4}
  tick={{
    fill: "var(--muted)",
    fontSize: 12,
  }}
  tickFormatter={(value) =>
    value >= 1000
      ? `₹${Math.round(value / 1000)}k`
      : `₹${value}`
  }
/>

            <Tooltip
              cursor={{ fill: "var(--surface-soft)" }}
              formatter={(value) => [
                formatCurrency(value),
                "Sales",
              ]}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text)",
              }}
              labelStyle={{
                color: "var(--muted)",
                marginBottom: "4px",
              }}
            />

            <Bar
              dataKey="total"
              fill="var(--blue)"
              radius={[8, 8, 0, 0]}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesOverview;