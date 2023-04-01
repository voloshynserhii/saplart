import { useEffect, useState } from "react";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import Label from "../../../components/label";
import { url } from "../../../utils/consts";

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export default function DocumentCard({ doc, ...props }) {
  const { title, isPublished, description, path } = doc;
  const [fileFormat, setFileFormat] = useState("img");
  const defultImagePath =
    fileFormat === "pdf" ? "/assets/PDF-icon.png" : "/assets/Document-icon.png";

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
        {!!isPublished && (
          <Label
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
          </Label>
        )}
        {fileFormat === "img" ? (
          <StyledProductImg alt={title} src={`${url}/${path}`} />
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
