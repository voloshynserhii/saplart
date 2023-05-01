import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PasswordFormDialog from "./PasswordForm";
import Iconify from "../../../components/iconify";
import { auth } from "../../../api";
import { url } from "../../../utils/consts";

export default function ProfileForm({ user, onUpdate }) {
  const [profileData, setProfileData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [link, setLink] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const { name = "", about = "", contacts = {}, avatarPath } = user || {};
    setSocialLinks(contacts?.socialLinks || []);

    const data = { name, about, contacts, avatarPath };
    if (user) {
      setProfileData(data);
      setAvatar(`${url}/${user?.avatarPath}`);
    }
  }, [user]);

  const handleUpdate = async (password) => {
    if (avatar !== user.avatar) {
      await auth.updateUser(user._id, file);
    }
    const data = {
      ...profileData,
      socialLinks,
      password,
    };
    onUpdate(data);
    setOpenDialog(false);
  };

  const changeFormHandler = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const socialLinkAddHandler = () => {
    setSocialLinks((prev) => [...prev, link]);
    setLink("");
  };

  const removeSocialLink = (link) => {
    const filtered = socialLinks.filter((sl) => sl !== link);
    setSocialLinks(filtered);
  };

  const generateBase64FromImage = (imageFile) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
    });

    reader.readAsDataURL(imageFile);
    return promise;
  };

  const onUploadFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setFile(formData);

    if (file) {
      generateBase64FromImage(file)
        .then((b64) => {
          setAvatar(b64);
        })
        .catch((e) => {
          setAvatar(null);
        });
    }
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
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 5 }}
      >
        {avatar && (
          <Box mt={2} textAlign="center" sx={{ width: 150 }}>
            <img
              src={avatar || profileData?.avatarPath}
              alt={user?.name}
              height="100%"
              accept="image/*"
              loading="lazy"
            />
          </Box>
        )}
        <Button variant="contained" component="label">
          Upload Avatar
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={onUploadFileHandler}
          />
        </Button>
      </Stack>
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
          value={profileData?.about || " "}
          helperText="Discribe yourself in 2-3 sentences"
          onChange={(event) =>
            changeFormHandler("about", event.currentTarget.value)
          }
        />
        <Typography variant="h6" sx={{ mb: 5, textAlign: "start" }}>
          Your public contacts:
        </Typography>
        <TextField
          name="email"
          label="Email address"
          value={profileData.contacts?.email || ""}
          helperText="Your public email address"
          onChange={(event) =>
            changeFormHandler("contacts", {
              ...profileData.contacts,
              email: event.currentTarget.value,
            })
          }
        />
        <TextField
          name="phone"
          label="Phone Number"
          value={profileData.contacts?.phone || ""}
          helperText="Your public phone number"
          onChange={(event) =>
            changeFormHandler("contacts", {
              ...profileData.contacts,
              phone: event.currentTarget.value,
            })
          }
        />

        <Stack spacing={0} sx={{ textAlign: "start" }}>
          <Typography variant="body2">Social Links:</Typography>
          {socialLinks?.map((link) => (
            <div style={{ display: "flex", alignItems: "center" }} key={link}>
              <Link
                href={`https://${link}`}
                underline="hover"
                target="_blank"
                rel="noopener"
              >
                {link}
              </Link>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={() => removeSocialLink(link)}
              >
                <Iconify icon="material-symbols:close" color="red" />
              </IconButton>
            </div>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            name="link"
            label="Add Social Link"
            value={link || ""}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button onClick={socialLinkAddHandler}>Add</Button>
        </Stack>
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
