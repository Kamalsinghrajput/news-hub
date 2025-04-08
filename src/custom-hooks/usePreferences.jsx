import { useEffect } from "react";
import { nhost } from "../lib/nhost";
import { fetchUserPreferences } from "../store/userPreferencesSlice";
import { useDispatch, useSelector } from "react-redux";

export const usePreferences = () => {
  const dispatch = useDispatch();
  const user = nhost.auth.getUser();
  const { preferences, loading } = useSelector(
    (state) => state.userPreferences
  );

  useEffect(() => {
    if (user && preferences.length === 0) {
      dispatch(fetchUserPreferences(nhost));
    }
  }, [user, dispatch, nhost, preferences.length]);

  return {
    preferences,
    loading,
  };
};
