import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import Form from "../components/Auth/Form";
import { state } from "../store/reducers/auth";

export default function Auth(props) {
  const router = useRouter();
  const { user } = useSelector(state);
  const [logIn, setLogIn] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Box
      component="main"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        p: 3,
      }}
    >
      <Form logIn={logIn} />
      {logIn && (
        <Typography variant="h6" component="h6"  sx={{ mt: 2 }}>
          Don't have account?
        </Typography>
      )}
      <Typography
        variant="body1"
        component="p"
        sx={{ my: 2, cursor: "pointer" }}
        onClick={() => setLogIn((prev) => !prev)}
      >
        {logIn ? "Sign Up" : "Log In"} instead
      </Typography>
    </Box>
  );
}
