import React from "react";
import News from "../components/news/News";
import SavedArticles from "../components/saved-articles/SavedArticles";
import Preferences from "../components/preference/Preferences";
import { Routes, Route } from "react-router-dom";
import { Register } from "../components/Register/Register";

const RoutesArray = [
  {
    href: "/",
    component: <News />,
  },
  {
    href: "/saved-articles",
    component: <SavedArticles />,
  },
  {
    href: "/preferences",
    component: <Preferences />,
  },
  {
    href: "/register",
    component: <Register />,
  },
];

export const AppRoutes = () => {
  return (
    <Routes>
      {RoutesArray.map(({ href, component }, key) => {
        return <Route path={href} element={component} key={key} />;
      })}
    </Routes>
  );
};
