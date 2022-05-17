import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: {},
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    alertMessage: (state, action) => {
      state.alert = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { loading, alertMessage } = globalSlice.actions;
export default globalSlice.reducer;
