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
      serializableCheck: false,
    }),
});

export default store;
