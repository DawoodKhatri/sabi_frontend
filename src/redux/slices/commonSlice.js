import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    loading: (state, { payload }) => {
      return { ...state, isLoading: payload };
    },
  },
});

export const { loading } = commonSlice.actions;

export default commonSlice.reducer;
