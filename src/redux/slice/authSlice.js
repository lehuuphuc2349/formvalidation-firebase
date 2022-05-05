import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../action/authAction";

const initialState = {
  currentUser: "",
};

export const registerAPI = createAsyncThunk("auth/register", async (data) => {
  return await register(data);
});

export const loginAPI = createAsyncThunk("auth/login", async (payload) => {
  const { email, password } = payload;
  console.log(payload);
  return await login(email, password);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith("auth") && type.endsWith("pending"),
      (state, action) => {
        state.currentUser = "";
      }
    );
    builder.addMatcher(
      ({ type }) => type.startsWith("auth") && type.endsWith("fulfilled"),
      (state, action) => {
        state.currentUser = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
