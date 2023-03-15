import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
// @mui
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  CircularProgress,
  Link,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

import useResponsive from "../hooks/useResponsive";
import Logo from "../components/logo";
import Iconify from "../components/iconify";
import { LoginForm } from "../sections/auth/login";
import { SignupForm } from "../sections/auth/signup";
import { state } from "../store/reducers/auth";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, error } = useSelector(state);
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const mdUp = useResponsive("up", "md");

  useEffect(() => {
    if (!!user) {
      setLoading(false);
      navigate("/dashboard", { replace: true });
    }
    if (error) {
      setLoading(false);
    }
  }, [user, error, navigate]);

  const formSwitchHandler = () => {
    setLogin((prev) => !prev);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Helmet>
        <title> Login | Lawyerd </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, {login ? "Welcome Back" : "New to Lawyerd?"}
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {`Sign ${login ? "in" : "up"} to Lawyerd`}
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {login && "Don’t have an account?"}
              <Link variant="subtitle2" onClick={formSwitchHandler}>
                {login ? "Get started" : "Login instead"}
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              {/* <Grid item>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Grid> */}

              {/* <Button
                sx={{ width: "33%" }}
                size="large"
                color="inherit"
                variant="outlined"
              >
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button> */}

              {/* <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button> */}
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            {login ? (
              <LoginForm
                onLoading={(loading) => !error && setLoading(loading)}
              />
            ) : (
              <SignupForm
                onLoading={(loading) => !error && setLoading(loading)}
              />
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
