import { createSlice } from "@reduxjs/toolkit";

const appLoaderSlice = createSlice({
  name: "appLoader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader(state) {
      state.isLoading = true;
    },
    hideLoader(state) {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = appLoaderSlice.actions;
export default appLoaderSlice.reducer;
