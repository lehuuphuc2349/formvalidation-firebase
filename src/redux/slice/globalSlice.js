import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    alert: (state, action) => {
      state.alert = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { loading, alert } = globalSlice.actions;
export default globalSlice.reducer;
