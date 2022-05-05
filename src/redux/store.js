import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import globalSlice from "./slice/globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
    }),
});

export default store;
