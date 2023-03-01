import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  CircularProgress,
  Container,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login, signup } from "../../store/reducers/auth";

export default function Form({ logIn }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleClick = () => {
    logIn
      ? dispatch(login({ email, password }))
      : dispatch(signup({ email, password }));
    setLoading(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack spacing={3}>
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(event) => setPassword(event.currentTarget.value)}
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
