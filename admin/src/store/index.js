import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import docReducer from "./reducers/documents";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doc: docReducer
  },
});