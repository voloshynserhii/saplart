import { Box, Card, Link, Typography, Stack, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledProductImg = styled("img")({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export default function ImageCard({ doc, ...props }) {
  const { title, isPublished, description, path } = doc;

  return (
    <Card style={{ cursor: "pointer" }} {...props}>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {/* {!!isPublished && (
          <FormControlLabel
            variant="filled"
            color="info"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            Published
          </FormControlLabel>
        )} */}
        <StyledProductImg alt={title} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="h6" noWrap style={{ cursor: "pointer" }}>
            {title}
          </Typography>
          <Typography variant="body2" noWrap style={{ cursor: "pointer" }}>
            {description}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
