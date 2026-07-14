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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

function PurchaseHistoryTable({
  purchases,
  onView,
  onEdit,
  onDelete,
  onPdf,
  onReturn,
}) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <>
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
          <Table sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.primary" }}>
                  Invoice
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Supplier
                </TableCell>

                <TableCell sx={{ color: "text.primary" }}>
                  Total Amount
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
              {purchases.map((purchase) => (
                <TableRow key={purchase.id} hover>
                  <TableCell sx={{ color: "text.primary" }}>
                    {purchase.invoiceNumber}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {purchase.supplierName}
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {formatCurrency(purchase.totalAmount)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={purchase.status || "COMPLETED"}
                      color="success"
                      size="small"
                    />
                  </TableCell>

                  <TableCell sx={{ color: "text.primary" }}>
                    {purchase.purchaseDate
                      ? new Date(
                          purchase.purchaseDate
                        ).toLocaleDateString("en-IN")
                      : "—"}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onView(purchase.id)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color="secondary"
                        onClick={() =>
                          onPdf(purchase.id)
                        }
                      >
                        <PictureAsPdfIcon />
                      </IconButton>

                      <IconButton
                        color="info"
                        onClick={() =>
                          onReturn(purchase)
                        }
                      >
                        <AssignmentReturnIcon />
                      </IconButton>

                      <IconButton
                        color="warning"
                        onClick={() =>
                          onEdit(purchase)
                        }
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() =>
                          onDelete(purchase)
                        }
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

      <Box className="mobile-data-list" sx={{ mt: 2 }}>
        {purchases.length === 0 ? (
          <Paper className="mobile-data-card" elevation={0}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No purchases found.
            </Typography>
          </Paper>
        ) : (
          purchases.map((purchase) => (
            <Paper
              key={purchase.id}
              className="mobile-data-card"
              elevation={0}
            >
              <Box className="mobile-data-card-header">
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="mobile-data-card-title">
                    {purchase.invoiceNumber || "No invoice"}
                  </Typography>

                  <Typography className="mobile-data-label">
                    {purchase.supplierName || "No supplier"}
                  </Typography>
                </Box>

                <Chip
                  label={purchase.status || "COMPLETED"}
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
                    {formatCurrency(purchase.totalAmount)}
                  </Typography>
                </Box>

                <Box>
                  <Typography className="mobile-data-label">
                    Date
                  </Typography>

                  <Typography className="mobile-data-value">
                    {purchase.purchaseDate
                      ? new Date(
                          purchase.purchaseDate
                        ).toLocaleDateString("en-IN")
                      : "—"}
                  </Typography>
                </Box>
              </Box>

              <Box className="mobile-data-actions">
                <IconButton
                  color="primary"
                  onClick={() => onView(purchase.id)}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  color="secondary"
                  onClick={() => onPdf(purchase.id)}
                >
                  <PictureAsPdfIcon />
                </IconButton>

                <IconButton
                  color="info"
                  onClick={() => onReturn(purchase)}
                >
                  <AssignmentReturnIcon />
                </IconButton>

                <IconButton
                  color="warning"
                  onClick={() => onEdit(purchase)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(purchase)}
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

export default PurchaseHistoryTable;