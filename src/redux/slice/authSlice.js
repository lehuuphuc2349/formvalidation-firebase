import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../action/authAction";

const initialState = {
  currentUser: "",
};

export const registerAPI = createAsyncThunk("auth/register", async (data) => {
  return await register(data);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAPI.pending, (state, action) => {
      state.currentUser = "";
    });
    builder.addCase(registerAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export default authSlice.reducer;
