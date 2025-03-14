import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Preferences from "./components/preference/Preferences.jsx";
import SignIn from "./components/Authentication/sign_in/SignIn.jsx";
import { useAuthenticationStatus } from "@nhost/react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants/constants.js";
import { useUserId } from "@nhost/react";
import Loader from "./components/utils/loader/Loader.jsx";

function App() {
  const userId = useUserId(); // Gets the authenticated user's ID

  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  const [userPreferences, setUserPreferences] = useState([]);

  async function getUserPreferences() {
    const response = await fetch(
      `${API_BASE_URL}/get-preferences?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    setUserPreferences(responseJson[0].category);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserPreferences();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        userPreferences={userPreferences}
        userId={userId}
        setUserPreferences={setUserPreferences}
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
          <div className=" gap-8">
            {isAuthenticated ? <News preferences={["general"]} /> : <SignIn />}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
