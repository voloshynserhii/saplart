import { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

const ImageCard = ({ path, title = '', description, ...props }) => {
  const [fallbackVisible, setFallbackVisible] = useState<boolean>(false);
  const [fileFormat, setFileFormat] = useState<string>("img");

  const defultImagePath =
    fileFormat === "pdf"
      ? "/PDF-icon.png"
      : fileFormat === "img"
      ? "/icons/defaultImage.png"
      : "/Document-icon.png";

  useEffect(() => {
    if (path) {
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
    }
  }, [path]);
  const onError = () => setFallbackVisible(true);

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }} {...props}>
      <CardActionArea>
        {fallbackVisible && (
          <>
            <CardMedia
              sx={{
                objectFit: "contain",
                position: "inherit",
                zIndex: 2,
              }}
              component="img"
              height="140"
              image={defultImagePath}
              alt={description}
            />
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
              download
              target="_blank"
              underline="none"
              sx={{ display: "block", textAlign: "center" }}
            >
              View
            </Link>
          </>
        )}
        {!fallbackVisible && path && (
          <CardMedia
            sx={{
              zIndex: 3,
            }}
            component="img"
            height="140"
            image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`}
            onError={onError}
            onLoad={() => setFallbackVisible(false)}
            alt={description}
          />
        )}
        <CardContent>
          {title && <Typography variant="h6" noWrap>
            {title}
          </Typography>}
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ImageCard;
