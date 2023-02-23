import { useState, useEffect } from "react";
import {
  Card,
  // CardHeader,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Iconify from "../../../components/iconify";

export default function ProfileForm({ user, onUpdate }) {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = () => {
    const data = {
      name,
      oldPassword,
      newPassword,
    };
    onUpdate(data);
  };

  return (
    <Card
      sx={{
        p: 10,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      {/* <CardHeader title={"Profile form"} subheader={"You can change your data here"} /> */}
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Your name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <TextField
          name="email"
          label="Email address"
          value={user.email}
          disabled
        />
        <TextField
          name="password"
          label="Old Password"
          type="password"
          onChange={(event) => setOldPassword(event.currentTarget.value)}
        />
        
        <TextField
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
        />
      </Stack>

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        onClick={handleUpdate}
      >
        Update
      </LoadingButton>
    </Card>
  );
}
