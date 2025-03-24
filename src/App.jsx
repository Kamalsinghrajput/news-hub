import { Navigate, HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import { useAuthenticationStatus, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants/constants";
import Loader from "./components/utils/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nhost } from "./lib/nhost";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const userId = useUserId();
  const { isAuthenticated, isLoading: isAuthLoading } =
    useAuthenticationStatus();

  const [appLoading, setAppLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState([]);
  const [articles, setArticles] = useState([]);

  async function getUserPreferences() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/get-preferences?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseJson = await response.json();
      setUserPreferences(responseJson[0]?.category || []);
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserPreferences();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refreshToken = params.get("refreshToken");

    const refreshSession = async () => {
      if (!refreshToken) return;

      try {
        const { session, error } = await nhost.auth.refreshSession(
          refreshToken
        );

        if (error) {
          console.error("Failed to refresh session:", error);
        } else {
          console.log("Session refreshed successfully:", session);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error refreshing session:", error);
      }
    };

    refreshSession();
  }, [location.search]);

  // if (isLoading || appLoading) {
  //   return <Loader />;
  // }
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar
        isAuthenticated={isAuthenticated}
        userPreferences={userPreferences}
        userId={userId}
        setUserPreferences={setUserPreferences}
        isAuthLoading={isAuthLoading}
        appLoading={appLoading}
      />
      <div className="min-h-screen transition-colors duration-200">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppRoutes
            preferences={userPreferences}
            userId={userId}
            setArticles={setArticles}
            articles={articles}
            setAppLoading={setAppLoading}
            appLoading={appLoading}
            setUserPreferences={setUserPreferences}
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
