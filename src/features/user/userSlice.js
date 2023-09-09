import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchLoggedInUserOrders } from "./userApi";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);

    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const {} = counterSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export default counterSlice.reducer;
