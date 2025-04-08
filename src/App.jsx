import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAuthenticationStatus, useUserId } from "@nhost/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nhost } from "./lib/nhost";
import { AppRoutes } from "./routes/AppRoutes";
import Loader from "./components/utils/loader/Loader";

function App() {
  const userId = useUserId();
  const { isAuthenticated, isLoading: isAuthLoading } =
    useAuthenticationStatus();

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

  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar
        isAuthenticated={isAuthenticated}
        userId={userId}
        isAuthLoading={isAuthLoading}
      />
      <div className="min-h-screen transition-colors duration-200">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
