import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../action/authAction";

const initialState = {
  currentUser: "",
};

export const registerAPI = createAsyncThunk("auth/register", async (data) => {
  return await register(data);
});

export const loginAPI = createAsyncThunk("auth/login", async (payload) => {
  const { email, password, remember } = payload;
  return await login(email, password, remember);
});

export const loginWithGoogleAPI = createAsyncThunk("auth/google", async () => {
  return await loginWithGoogleAPI();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith("auth") && type.endsWith("fulfilled"),
      (state, action) => {
        state.currentUser = action.payload;
      }
    );
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
