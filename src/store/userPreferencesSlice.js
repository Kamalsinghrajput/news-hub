import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "../lib/nhost";
import { GET_PREFERENCES } from "../graphql/queries/queries";

export const fetchUserPreferences = createAsyncThunk(
  "userPreferences/fetchUserPreferences",
  async (nhost, { rejectWithValue }) => {
    const user = nhost.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return rejectWithValue("User is not authenticated");
    }

    try {
      const { data } = await apolloClient.query({
        query: GET_PREFERENCES,
        variables: { userId },
      });

      const categories = data.user_preferences?.length
        ? data.user_preferences.map((pref) => pref.category)
        : [];

      return categories[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState: {
    preferences: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPreferences.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.preferences = [];
      });
  },
});

export default userPreferencesSlice.reducer;
