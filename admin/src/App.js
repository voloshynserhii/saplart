import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Alert } from "@mui/material";

import Router from "./routes";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { clearAuthErrors, setUser, state } from "./store/reducers/auth";
import { clearDocErrors, state as docState } from "./store/reducers/documents";

export default function App() {
  const dispatch = useDispatch();
  const authError = useSelector(state)?.error;
  const docError = useSelector(docState).error;
  const [hasErrors, setHasErrors] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!!user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!!authError) setHasErrors("auth");
    if (!!docError) setHasErrors("doc");
  }, [authError, docError]);

  useEffect(() => {
    let timeId;
    if (!!hasErrors) {
      timeId = setTimeout(() => {
        hasErrors === "auth"
          ? dispatch(clearAuthErrors())
          : dispatch(clearDocErrors());
      }, 3000);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [hasErrors]);

  return (
    <GoogleOAuthProvider clientId="AIzaSyCy-vYXvI3-u0tzssd7Bn_5t5KtGjGAEns">
      <ThemeProvider>
        {authError && (
          <Alert
            severity="error"
            sx={{ position: "absolute", top: "5%", right: "0", width: "50%" }}
          >
            {authError}
          </Alert>
        )}
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
