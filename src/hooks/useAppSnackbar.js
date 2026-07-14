import { useState } from "react";

function useAppSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const showSuccess = (message) => {
    showSnackbar(message, "success");
  };

  const showError = (message) => {
    showSnackbar(message, "error");
  };

  const showWarning = (message) => {
    showSnackbar(message, "warning");
  };

  const closeSnackbar = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  return {
    snackbar,
    showSuccess,
    showError,
    showWarning,
    closeSnackbar,
  };
}

export default useAppSnackbar;