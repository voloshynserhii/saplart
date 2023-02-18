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
  const authErrors = useSelector(state)?.errors;
  const docErrors = useSelector(docState).errors;
  const [hasErrors, setHasErrors] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!!user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  
  useEffect(() => {
    if(authErrors?.length) setHasErrors('auth');
    if(docErrors?.length) setHasErrors('doc');
  }, [authErrors, docErrors])

  useEffect(() => {
    let timeId;
    if (!!hasErrors) {
      timeId = setTimeout(() => {
        hasErrors === 'auth' ? dispatch(clearAuthErrors()) : dispatch(clearDocErrors());
      }, 3000);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [hasErrors]);

  const errors = [...authErrors, ...docErrors];
  
  return (
    <GoogleOAuthProvider clientId="AIzaSyCy-vYXvI3-u0tzssd7Bn_5t5KtGjGAEns">
      <ThemeProvider>
        {errors &&
          errors?.map((err) => (
            <Alert key={err?.msg} severity="error" sx={{ mb: 2 }}>
              {`${err?.msg} ${err?.param || ""}`}
            </Alert>
          ))}
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
