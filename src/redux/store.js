import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import globalSlice from "./slice/globalSlice";
import profileSlice from "./slice/profileSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
