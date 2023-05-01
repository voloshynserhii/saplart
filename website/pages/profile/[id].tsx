import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import ProfileForm from "../../components/Profile";
import { auth } from "../../api";

type Router = {
  id?: string;
};
interface Profile {
  name?: string;
  about?: string;
  avatarPath?: string;
  documents?: {}[];
}

export default function Profile() {
  const router = useRouter();
  const { id }: Router = router.query;
  const [profileData, setProfileData] = useState<Profile>({});

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id]);

  const getUserData = async (id: string) => {
    const data = await auth.getUser(id);
    setProfileData(data.user);
  };

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
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Grid>

          <Grid item md={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_ADMIN_URL}/dashboard/user`
                  )
                }
              >
                Edit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <ProfileForm
        user={profileData}
        onOpenIPR={(id: string) => router.push(`/ipr/${id}`)}
      />
    </Container>
  );
}
