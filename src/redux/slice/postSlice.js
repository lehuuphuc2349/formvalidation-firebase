import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCollections } from "../action/postActions";

const initialState = {
  collections: [],
  dataUpdate: {},
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
    setUpdateData: (state, action) => {
      state.dataUpdate = action.payload;
    },
    update: (state, action) => {
      const newData = state.collections.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.collections = newData;
    },
    remove: (state, action) => {
      const newData = state.collections.filter(
        (item) => item.id !== action.payload.id
      );
      state.collections = newData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(collectionFetchData.fulfilled, (state, action) => {
      state.collections = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { create, setUpdateData, update, remove } = postSlice.actions;
