import { Box, Typography, Button } from "@mui/material";

function PageHeader({
  title,
  buttonText,
  onButtonClick,
}) {
  return (
    <Box className="erp-page-header">
      <Typography className="erp-page-title">
        {title}
      </Typography>

      {buttonText && (
        <Box className="erp-page-action">
          <Button
            variant="contained"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default PageHeader;