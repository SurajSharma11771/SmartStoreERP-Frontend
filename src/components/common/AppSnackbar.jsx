import { Alert, Snackbar } from "@mui/material";

function AppSnackbar({
  open,
  message,
  severity = "success",
  onClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="standard"
        sx={{
          width: "100%",
          minWidth: {
            xs: "calc(100vw - 28px)",
            sm: 360,
          },

          borderRadius: 2.5,
          fontWeight: 600,
          alignItems: "center",

          bgcolor:
            severity === "success"
              ? "#eef8ef"
              : severity === "error"
                ? "#fdecec"
                : severity === "warning"
                  ? "#fff6e5"
                  : "#edf5ff",

          color:
            severity === "success"
              ? "#166534"
              : severity === "error"
                ? "#b91c1c"
                : severity === "warning"
                  ? "#92400e"
                  : "#1d4ed8",

          border: "1px solid",
          borderColor:
            severity === "success"
              ? "#d7ecd9"
              : severity === "error"
                ? "#f5caca"
                : severity === "warning"
                  ? "#f6dfb3"
                  : "#cfe0ff",

          boxShadow: "0 10px 28px rgba(15, 23, 42, 0.12)",

          "& .MuiAlert-icon": {
            color:
              severity === "success"
                ? "#2e7d32"
                : severity === "error"
                  ? "#d32f2f"
                  : severity === "warning"
                    ? "#ed6c02"
                    : "#1976d2",
          },

          "& .MuiAlert-action": {
            color: "inherit",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;