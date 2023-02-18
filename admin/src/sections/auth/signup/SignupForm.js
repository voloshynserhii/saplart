import { useState } from "react";
import { useDispatch } from "react-redux";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { signup } from "../../../store/reducers/auth";

// ----------------------------------------------------------------------

export default function SignupForm(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    props.onLoading(true);
    dispatch(signup({ email, password, name }));
  };

  return (
    <>
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
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <TextField
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <div>
          <Checkbox name="remember" label="Remember me" />
          <span>Remember me</span>
        </div>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Signup
      </LoadingButton>
    </>
  );
}
