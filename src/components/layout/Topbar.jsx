import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

const drawerWidth = 260;

function Topbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "#020617",
        borderBottom: "1px solid #1e293b",
        boxShadow: "none",
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          SmartStore ERP Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2">
            Suraj
          </Typography>

          <Avatar sx={{ width: 34, height: 34 }}>
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;