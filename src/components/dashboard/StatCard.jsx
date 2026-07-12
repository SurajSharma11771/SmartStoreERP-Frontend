import { Box, Typography } from "@mui/material";

function StatCard({
  title,
  value,
  icon,
  accent = "blue",
  description = "Live business data",
}) {
  return (
    <div className={`dashboard-card stat-card stat-card-${accent}`}>
      <div className="stat-card-content">
        <div className="stat-card-heading">
          <Typography className="stat-title">{title}</Typography>

          <Box className={`stat-icon stat-icon-${accent}`}>
            {icon}
          </Box>
        </div>

        <Typography className="stat-value">{value}</Typography>

        <div className="stat-footer">
          <span className="live-indicator">
            <span className="live-dot" />
            Live
          </span>

          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;