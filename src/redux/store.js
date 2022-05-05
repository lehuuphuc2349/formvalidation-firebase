import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slice/globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
    }),
});

export default store;
