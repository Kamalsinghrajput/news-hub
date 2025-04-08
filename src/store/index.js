import { configureStore } from "@reduxjs/toolkit";
import userPreferencesReducer from "./userPreferencesSlice";
import appLoaderReducer from "./appLoaderSlice";

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    appLoader: appLoaderReducer,
  },
});
