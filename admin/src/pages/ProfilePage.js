import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Backdrop,
  CircularProgress,
  Stack,
  Popover,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";

import Iconify from "../components/iconify";
import { ProfileForm } from "../sections/auth/profile";
import { auth } from "../api";
import { state, getUser } from "../store/reducers/auth";

export default function UserPage() {
  const { id: userId } = useParams();
  const [open, setOpen] = useState(null);
  const { user } = useSelector(state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id || userId) dispatch(getUser(user?._id || userId));
  }, [user?._id, userId]);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleUpdateUser = async (userData) => {
    await auth.updateUser(user?._id, userData).then(() => dispatch(getUser(user?._id)));
  };

  if (!user)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <Helmet>
        <title> User | Lawyerd </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <ProfileForm
          user={user}
          onUpdate={(userData) => handleUpdateUser(userData)}
        />
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
