import { Box, Typography, Button } from "@mui/material";

function PageHeader({
  title,
  buttonText,
  onButtonClick,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>

      {buttonText && (
        <Button
          variant="contained"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}

export default PageHeader;
