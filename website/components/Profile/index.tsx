import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageCard from "../IPR/ImageCard";

interface Profile {
  name?: string;
  about?: string;
  avatarPath?: string;
  documents?: { _id: string }[];
  contacts?: {
    phone?: string;
    email?: string;
    socialLinks?: string[];
  };
}

export default function ProfileForm({ user, onOpenIPR }) {
  const [fallbackVisible, setFallbackVisible] = useState<boolean>(true);
  const { name, about, avatarPath, documents, contacts }: Profile = user;

  const fallback = "/icons/defaultAvatar.svg";

  const onError = () => setFallbackVisible(false);

  useEffect(() => {
    if (avatarPath) setFallbackVisible(false);
  }, [avatarPath]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            {fallbackVisible && (
              <CardMedia
                sx={{
                  objectFit: "contain",
                  position: "inherit",
                  zIndex: 2,
                }}
                component="img"
                height="300"
                image={fallback}
                alt="fallback picture"
              />
            )}
            {!fallbackVisible && avatarPath && (
              <CardMedia
                sx={{
                  objectFit: "contain",
                  position: "inherit",
                  zIndex: 3,
                }}
                component="img"
                height="300"
                image={`${process.env.NEXT_PUBLIC_SERVER_URL}/${avatarPath}`}
                onError={onError}
                alt="profile picture"
              />
            )}
          </CardContent>
          <CardContent sx={{ paddingTop: 0 }}>
            <Typography
              variant="body1"
              component="div"
              sx={{ marginBottom: 1 }}
            >
              How to reach me?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Email:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contacts?.email || ""}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Phone:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contacts?.phone || ""}
              </Typography>
            </Stack>
            <Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1 }}
              >
                Social Links:
              </Typography>
              {contacts?.socialLinks?.map((link) => (
                <Link
                  key={link}
                  href={`https://${link}`}
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={9}>
        <Card
          sx={{
            p: 10,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Stack spacing={3}>
            <TextField disabled label="User Name" value={name || ""} />
            <TextField
              disabled
              multiline
              rows={3}
              label="About User"
              value={about || " "}
            />
          </Stack>
          <Grid item sm={12} mb={2} mt={4}>
            <Typography variant="h6" align="left">
              Published IPRs:
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {documents?.map((doc) => (
              <Grid item key={doc?._id} xs={12} sm={6} md={4}>
                <ImageCard doc={doc} onClick={() => onOpenIPR(doc?._id)} />
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
