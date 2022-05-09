import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeProfile, getProfile } from "../action/profileAction";

const initialState = {
  profile: {},
};

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (payload) => {
    const { user, data } = payload;
    return await changeProfile(user, data);
  }
);

export const fetchProfile = createAsyncThunk("profile/fetch", async (uid) => {
  return await getProfile(uid);
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.startsWith("profile") && type.endsWith("pending"),
        (state) => {
          state.profile = "";
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("profile") && type.endsWith("fulfilled"),
        (state, action) => {
          state.profile = action.payload;
        }
      );
  },
});

export default profileSlice.reducer;
