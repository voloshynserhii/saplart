import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";

import { auth } from "../../api";
type Router = {
  id?: string;
};
interface Profile {
  name?: string;
  about?: string;
  avatarPath?: string;
}

export default function Profile() {
  const router = useRouter();
  const { id }: Router = router.query;
  const [profileData, setProfileData] = useState<Profile>({});
  const { name, about, avatarPath }: Profile = profileData;
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${avatarPath}`
  );
  const fallback = "/icons/defaultAvatar.svg";

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id]);

  const getUserData = async (id: string) => {
    const data = await auth.getUser(id);
    setProfileData(data.user);
  };

  const onError = () => setImgSrc(fallback);

  return (
    <Container>
      <Grid item my={10}>
        <Grid item sm={12} mb={2}>
          <Typography variant="h4">Profile</Typography>
        </Grid>
        <Grid item sm={12} container>
          <Grid item md={9}>
            <Button
              variant="outlined"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => router.push("/")}
            >
              Back
            </Button>
          </Grid>

          <Grid item md={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                sx={{ objectFit: "contain" }}
                component="img"
                height="300"
                image={imgSrc ? imgSrc : fallback}
                onError={onError}
                alt="profile picture"
              />
            </CardActionArea>
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
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
