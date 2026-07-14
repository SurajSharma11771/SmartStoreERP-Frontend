import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

function SalesHistoryTable({
  sales,
  onView,
  onDelete,
  onReturn,
}) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const getReturnStatusColor = (returnStatus) => {
    if (returnStatus === "RETURNED") {
      return "error";
    }

    if (returnStatus === "PARTIAL_RETURN") {
      return "warning";
    }

    return "success";
  };

  return (
    <>
      {/* Desktop and tablet table */}
      <Box className="desktop-data-table">
        <TableContainer
          component={Paper}
          sx={{
            mt: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 1050 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>
                  Invoice
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Customer
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Total Amount
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Returned
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Net Sale
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Return Status
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Status
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Date
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {sale.invoiceNumber}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {sale.customerName}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(sale.totalAmount)}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(sale.returnedAmount)}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(sale.netAmount)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={sale.returnStatus || "NOT_RETURNED"}
                      color={getReturnStatusColor(sale.returnStatus)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={sale.status || "COMPLETED"}
                      color="success"
                      size="small"
                    />
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {sale.saleDate
                      ? new Date(sale.saleDate).toLocaleDateString("en-IN")
                      : "—"}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => onView(sale.id)}
                        aria-label="View sale"
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color="info"
                        onClick={() => onReturn(sale)}
                        aria-label="Return sale"
                      >
                        <AssignmentReturnIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => onDelete(sale)}
                        aria-label="Delete sale"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Mobile cards */}
      <Box className="mobile-data-list" sx={{ mt: 2 }}>
        {sales.length === 0 ? (
          <Paper
            className="mobile-data-card"
            elevation={0}
          >
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No sales found.
            </Typography>
          </Paper>
        ) : (
          sales.map((sale) => (
            <Paper
              key={sale.id}
              className="mobile-data-card"
              elevation={0}
            >
              <Box className="mobile-data-card-header">
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="mobile-data-card-title">
                    {sale.invoiceNumber || "No invoice"}
                  </Typography>

                  <Typography className="mobile-data-label">
                    {sale.customerName || "Walk-in customer"}
                  </Typography>
                </Box>

                <Chip
                  label={sale.status || "COMPLETED"}
                  color="success"
                  size="small"
                />
              </Box>

              <Box className="mobile-data-card-grid">
                <Box>
                  <Typography className="mobile-data-label">
                    Total Amount
                  </Typography>

                  <Typography className="mobile-data-value">
                    {formatCurrency(sale.totalAmount)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Returned
                  </Typography>

                  <Typography className="mobile-data-value">
                    {formatCurrency(sale.returnedAmount)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Net Sale
                  </Typography>

                  <Typography className="mobile-data-value">
                    {formatCurrency(sale.netAmount)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Date
                  </Typography>

                  <Typography className="mobile-data-value">
                    {sale.saleDate
                      ? new Date(sale.saleDate).toLocaleDateString("en-IN")
                      : "—"}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 1.5 }}>
                <Chip
                  label={sale.returnStatus || "NOT_RETURNED"}
                  color={getReturnStatusColor(sale.returnStatus)}
                  size="small"
                />
              </Box>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => onView(sale.id)}
                  aria-label="View sale"
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  color="info"
                  onClick={() => onReturn(sale)}
                  aria-label="Return sale"
                >
                  <AssignmentReturnIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(sale)}
                  aria-label="Delete sale"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </>
  );
}

export default SalesHistoryTable;