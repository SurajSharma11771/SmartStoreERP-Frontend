import { Box, TextField } from "@mui/material";

function SearchToolbar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}

export default SearchToolbar;