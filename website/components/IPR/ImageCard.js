import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  FormControlLabel,
} from "@mui/material";
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
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [fileFormat, setFileFormat] = useState("img");

  const { title, description, path } = doc;

  const defultImagePath =
    fileFormat === "pdf"
      ? "/PDF-icon.png"
      : fileFormat === "img"
      ? "/icons/defaultImage.png"
      : "/Document-icon.png";

  const onError = () => setFallbackVisible(true);

  useEffect(() => {
    if (path.includes(".doc") || path.includes(".xls")) {
      setFileFormat("document");
    } else if (path.includes(".pdf")) {
      setFileFormat("pdf");
    } else if (
      path.includes(".png") ||
      path.includes(".jpg") ||
      path.includes(".svg") ||
      path.includes(".gif") ||
      path.includes(".jpeg")
    ) {
      setFileFormat("img");
    } else {
      setFileFormat("document");
    }
  }, [path]);

  return (
    <Card style={{ cursor: "pointer" }} {...props}>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {fileFormat === "img" && !fallbackVisible ? (
          <StyledProductImg
            alt={title}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
            onError={onError}
          />
        ) : (
          <StyledProductImg
            alt={title}
            src={defultImagePath}
            style={{ objectFit: "contain" }}
          />
        )}
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
