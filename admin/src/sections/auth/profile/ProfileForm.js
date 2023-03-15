import { useState, useEffect } from "react";
import { Card, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PasswordFormDialog from "./PasswordForm";

export default function ProfileForm({ user, onUpdate }) {
  const [profileData, setProfileData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const { name = "", about = "" } = user || {};

    const data = { name, about };
    if (user) {
      setProfileData(data);
    }
  }, [user]);

  const handleUpdate = (password) => {
    const data = {
      ...profileData,
      password,
    };
    onUpdate(data);
    setOpenDialog(false);
  };

  const changeFormHandler = (field, value) => {
    setProfileData((prev) => ({ ...profileData, [field]: value }));
  };

  return (
    <Card
      sx={{
        p: 10,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <PasswordFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onUpdateProfile={(password) => handleUpdate(password)}
      />
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Your public name"
          value={profileData.name || ""}
          helperText="Your public name is visible to other users"
          onChange={(event) =>
            changeFormHandler("name", event.currentTarget.value)
          }
        />

        <TextField
          name="email"
          label="Email address"
          defaultValue={user.email}
          disabled
          helperText="Email address will not be shown to other users"
        />
        <TextField
          name="about"
          label="About"
          multiline
          rows={4}
          defaultValue={profileData.about || ""}
          helperText="Discribe yourself in 2-3 sentences"
          onChange={(event) =>
            changeFormHandler("about", event.currentTarget.value)
          }
        />
      </Stack>

      <LoadingButton
        sx={{ my: 3 }}
        size="large"
        type="submit"
        variant="contained"
        onClick={() => setOpenDialog(true)}
      >
        Update
      </LoadingButton>
    </Card>
  );
}
