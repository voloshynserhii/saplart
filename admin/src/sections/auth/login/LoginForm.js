import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Iconify from "../../../components/iconify";
import { login } from "../../../store/reducers/auth";

export default function LoginForm(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  const handleClick = async () => {
    let hasError = false;
    const validEmail = emailRegexp.test(email);
    if (!validEmail || !email.includes(".")) {
      setError((err) => ({ ...err, email: "Provide valid email" }));
      hasError = true;
    }
    if (password.length < 4) {
      setError((err) => ({
        ...err,
        password: "Password must be at least 4 characters",
      }));
      hasError = true;
    }

    if (hasError) return;
    
    props.onLoading(true);
    await dispatch(login({ email, password }));
    props.onLoading(false);
    setError({});
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          error={!!error?.email}
          helperText={error?.email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={!!error?.password}
          helperText={error?.password}
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
        {/* <div>
          <Checkbox name="remember" label="Remember me" />
          <span>Remember me</span>
        </div> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
