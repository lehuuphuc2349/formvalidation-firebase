import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCollections } from "../action/postActions";

const initialState = {
  collections: [],
};

export const collectionFetchData = createAsyncThunk(
  "posts/fetch",
  async (uid) => {
    const result = await getCollections(uid);
    return result;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    create: (state, action) => {
      state.collections.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(collectionFetchData.fulfilled, (state, action) => {
      state.collections = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { create } = postSlice.actions;
