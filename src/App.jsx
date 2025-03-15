import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import SavedArticles from "./components/saved-articles/SavedArticles.jsx";
import Preferences from "./components/preference/Preferences.jsx";
import SignIn from "./components/Authentication/sign_in/SignIn.jsx";
import { useAuthenticationStatus } from "@nhost/react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants/constants.js";
import { useUserId } from "@nhost/react";
import Loader from "./components/utils/loader/Loader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const userId = useUserId();

  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const [appLoading, setAppLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState([]);
  const [showSavedArticles, setShowSavedArticles] = useState(false);

  // State is managed here for News Component as opening Saved Articles destroys news's articles state.
  const [articles, setArticles] = useState([]);

  async function getUserPreferences() {
    const response = await fetch(
      `${API_BASE_URL}/get-preferences?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    setUserPreferences(responseJson[0]?.category || []);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserPreferences();
    }
  }, [isAuthenticated]);

  if (isLoading || appLoading) {
    return <Loader />;
  }

  const toggleSavedArticles = () => {
    setShowSavedArticles((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar
        isAuthenticated={isAuthenticated}
        userPreferences={userPreferences}
        userId={userId}
        setUserPreferences={setUserPreferences}
        toggleSavedArticles={toggleSavedArticles}
      />

      {isAuthenticated && userPreferences.length === 0 && (
        <Preferences
          userPreferences={userPreferences}
          userId={userId}
          setUserPreferences={setUserPreferences}
        />
      )}

      <div className={"min-h-screen transition-colors duration-200"}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="gap-8">
            {isAuthenticated ? (
              showSavedArticles ? (
                <SavedArticles userId={userId} />
              ) : (
                <News
                  preferences={userPreferences}
                  userId={userId}
                  setArticles={setArticles}
                  articles={articles}
                  setAppLoading={setAppLoading}
                  appLoading={appLoading}
                />
              )
            ) : (
              <SignIn />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
