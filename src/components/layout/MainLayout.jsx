import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const drawerWidth = 260;

function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      <Sidebar drawerWidth={drawerWidth} />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar />

        <Box
          component="main"
          sx={{
            p: 3,
            ml: `${drawerWidth}px`,
            mt: "64px",
            color: "white",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;