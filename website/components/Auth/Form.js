import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { login, signup } from "../../store/reducers/auth";

export default function Form({ logIn }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    logIn ? dispatch(login({ email, password })) : dispatch(signup({ email, password }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
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
                  {/* <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  /> */}
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
