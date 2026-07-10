import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ProductToolbar({
  search,
  setSearch,
  onAddClick,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 3,
        gap: 2,
      }}
    >
      <TextField
        label="Search Product"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: 350,
          bgcolor: "white",
          borderRadius: 1,
        }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        Add Product
      </Button>
    </Box>
  );
}

export default ProductToolbar;
