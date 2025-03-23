import React from "react";
import News from "../components/news/News";
import SavedArticles from "../components/saved-articles/SavedArticles";
import Preferences from "../components/preference/Preferences";
import { Routes, Route } from "react-router-dom";
import { Register } from "../components/Register/Register";

export const AppRoutes = ({
  userPreferences,
  userId,
  setArticles,
  articles,
  appLoading,
  setAppLoading,
  setUserPreferences,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <News
            preferences={userPreferences}
            userId={userId}
            setArticles={setArticles}
            articles={articles}
            setAppLoading={setAppLoading}
            appLoading={appLoading}
          />
        }
      />

      <Route
        path="/saved-articles"
        element={<SavedArticles userId={userId} />}
      />

      <Route
        path="/preferences"
        element={
          <Preferences
            userPreferences={userPreferences}
            userId={userId}
            setUserPreferences={setUserPreferences}
            appLoading={appLoading}
          />
        }
      />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
