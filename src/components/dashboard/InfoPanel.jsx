import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function InfoPanel({ title, items }) {
  return (
    <Card sx={{ bgcolor: "#020617", color: "white", border: "1px solid #1e293b", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>

        <Stack spacing={1.5}>
          {items.map((item) => (
            <Box key={item} sx={{ p: 1.5, borderRadius: 2, bgcolor: "#0f172a", border: "1px solid #1e293b" }}>
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InfoPanel;
