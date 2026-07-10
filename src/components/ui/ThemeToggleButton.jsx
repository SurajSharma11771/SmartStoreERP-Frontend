import {
  IconButton,
  Tooltip,
} from "@mui/material";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useThemeMode } from "../../context/ThemeContext";

function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip
      title={
        mode === "light"
          ? "Dark mode"
          : "Light mode"
      }
    >
      <IconButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          width: 42,
          height: 42,
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",

          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        {mode === "light" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggleButton;