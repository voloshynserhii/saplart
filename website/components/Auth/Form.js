import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Container,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { state, login, signup } from "../../store/reducers/auth";

export default function Form({ logIn }) {
  const { error: authError } = useSelector(state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [authError]);

  const handleClick = () => {
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

    logIn
      ? dispatch(login({ email, password }))
      : dispatch(signup({ email, password }));
    setLoading(true);
  };

  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      {authError && (
        <Alert
          severity="error"
          sx={{ position: "absolute", top: "9%", right: "0", width: "100%" }}
        >
          {authError}
        </Alert>
      )}
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          error={!!error?.email}
          helperText={error?.email}
          onChange={(event) => {
            setError((err) => ({ ...err, email: "" }));
            setEmail(event.currentTarget.value);
          }}
          autoFocus
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            setError((err) => ({ ...err, password: "" }));
            setPassword(event.currentTarget.value);
          }}
        />
      </Stack>

      <Button
        sx={{ my: 2 }}
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        {logIn ? "Login" : "Sign Up"}
      </Button>
    </Container>
  );
}
