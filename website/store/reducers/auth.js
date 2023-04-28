import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../api";
const initialState = {
  isAuthenticated: false,
  user: null,
  error: "",
};

export const signup = createAsyncThunk("signup", async (query) => {
  return auth.signup(query);
});

export const login = createAsyncThunk("login", async (query) => {
  return auth.login(query);
});

export const updateUser = createAsyncThunk("updateUser", async (query) => {
  return ;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.isAuthenticated = true;
    },
    clearAuthErrors: (state, action) => {
      state.errors = [];
      state.error = "";
    },
    logOut: (state) => {
      auth.logout();
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } 
        if(action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
        if(action.payload.error) {
          state.error = action.payload.error;
        }
      });
  },
});

export const { clearAuthErrors, setUser, logOut } = authSlice.actions;

export const state = (state) => state.auth;

export default authSlice.reducer;
