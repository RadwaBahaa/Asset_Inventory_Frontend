import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/login";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
