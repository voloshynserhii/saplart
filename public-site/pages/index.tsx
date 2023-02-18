import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import IPRList from "../components/IPR";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 2 }}>
        List of published IPRs
      </Typography>
      <IPRList />
    </Box>
  );
}
