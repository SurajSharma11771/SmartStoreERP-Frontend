import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

const ThemeModeContext = createContext(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error(
      "useThemeMode must be used inside AppThemeProvider"
    );
  }

  return context;
}

function getInitialMode() {
  const savedMode = localStorage.getItem(
    "smartstore-theme"
  );

  if (
    savedMode === "light" ||
    savedMode === "dark"
  ) {
    return savedMode;
  }

  return "light";
}

export default function AppThemeProvider({
  children,
}) {
  const [mode, setMode] = useState(getInitialMode);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const nextMode =
        currentMode === "light" ? "dark" : "light";

      localStorage.setItem(
        "smartstore-theme",
        nextMode
      );

      document.documentElement.setAttribute(
        "data-theme",
        nextMode
      );

      return nextMode;
    });
  };

  useMemo(() => {
    document.documentElement.setAttribute(
      "data-theme",
      mode
    );
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main:
              mode === "dark"
                ? "#60a5fa"
                : "#2563eb",
          },

          background: {
            default:
              mode === "dark"
                ? "#07101f"
                : "#f8fafc",

            paper:
              mode === "dark"
                ? "#111827"
                : "#ffffff",
          },

          text: {
            primary:
              mode === "dark"
                ? "#f8fafc"
                : "#0f172a",

            secondary:
              mode === "dark"
                ? "#94a3b8"
                : "#64748b",
          },

          divider:
            mode === "dark"
              ? "#263244"
              : "#e5e7eb",
        },

        shape: {
          borderRadius: 12,
        },

        typography: {
          fontFamily:
            "Inter, Roboto, Arial, sans-serif",

          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor:
                  mode === "dark"
                    ? "#07101f"
                    : "#f8fafc",
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },

          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor:
                  mode === "dark"
                    ? "#111827"
                    : "#ffffff",
              },
            },
          },

          MuiTableContainer: {
            styleOverrides: {
              root: {
                backgroundColor:
                  mode === "dark"
                    ? "#111827"
                    : "#ffffff",
              },
            },
          },

          MuiTableCell: {
            styleOverrides: {
              root: {
                borderColor:
                  mode === "dark"
                    ? "#263244"
                    : "#e5e7eb",
              },

              head: {
                fontWeight: 800,
              },
            },
          },

          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider
      value={{ mode, toggleTheme }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}