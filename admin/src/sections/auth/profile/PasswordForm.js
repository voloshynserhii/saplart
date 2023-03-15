import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Iconify from "../../../components/iconify";

export default function FormDialog({ open, onClose, onUpdateProfile }) {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const agreeHandler = () => {
    onUpdateProfile(password);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do youreally  want to update your profile?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please type your password and click Update button!
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            fullWidth
            name="password"
            label="Password"
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
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={agreeHandler} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
