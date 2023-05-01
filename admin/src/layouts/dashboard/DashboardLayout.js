import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress } from "@mui/material";

import Header from "./header";
import Nav from "./nav";
import { state } from "../../store/reducers/auth";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout() {
  const { isAuthenticated } = useSelector(state);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/auth");
      }
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
