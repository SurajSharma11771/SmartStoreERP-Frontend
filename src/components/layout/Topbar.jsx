import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import ThemeToggleButton from "../ui/ThemeToggleButton";

const drawerWidth = 290;

function Topbar({ onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          xs: "100%",
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          xs: 0,
          md: `${drawerWidth}px`,
        },

        bgcolor: "background.paper",
        color: "text.primary",

        borderBottom: "1px solid",
        borderColor: "divider",

        boxShadow: "none",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 64,
            sm: 72,
          },

          px: {
            xs: 1.5,
            sm: 3,
          },

          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            gap: 1,
          }}
        >
          <IconButton
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
              color: "text.primary",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 20,
                },
                fontWeight: 900,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              SmartStore ERP
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Business Management System
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 0.75,
              sm: 1.5,
            },
          }}
        >
          <ThemeToggleButton />

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              textAlign: "right",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 800 }}
            >
              Suraj
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Administrator
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "primary.main",
              fontWeight: 800,
            }}
          >
            S
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;