import { Newspaper, Settings, LogOut, Save, X } from "lucide-react";
import { useNhostClient, useSignOut } from "@nhost/react";
import { useEffect, useState } from "react";
import Preferences from "../preference/Preferences";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPreferences } from "../../store/userPreferencesSlice";

const Navbar = ({
  isAuthenticated,
  userId,
  toggleSavedArticles,
  isAuthLoading,
}) => {
  const nhost = useNhostClient();
  const user = nhost.auth.getUser();
  const { signOut } = useSignOut();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { preferences, loading } = useSelector(
    (state) => state.userPreferences
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && preferences.length === 0) {
      dispatch(fetchUserPreferences(nhost));
    }
  }, [user, dispatch, nhost, preferences.length]);

  const handleLogout = async () => {
    await signOut();
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  if (!isAuthLoading && !isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  if (isAuthenticated && !loading && preferences?.length === 0) {
    return <Navigate to="/preferences" />;
  }

  return (
    <>
      <header className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={toggleSavedArticles}
            >
              <div className="bg-black p-2 rounded-lg backdrop-blur-sm">
                <Newspaper className="text-white" size={28} />
              </div>
              <Link
                to={"/"}
                className="text-2xl font-bold text-white tracking-tight"
              >
                NewsHub
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to={"/saved-articles"}
                className="cursor-pointer ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200"
              >
                <Save size={20} className="text-white" />
                <span className="text-white text-sm font-medium">
                  Saved Articles
                </span>
              </Link>
              <button
                className="cursor-pointer ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings size={20} className="text-white" />
                <span className="text-white text-sm font-medium">Settings</span>
              </button>
              {isAuthenticated && (
                <button
                  className="ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={20} className="text-white" />
                  <span className="text-white text-sm font-medium">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <button
            onClick={handleCloseSettings}
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1"
          >
            <X size={24} />
          </button>
          <Preferences userId={userId} />
        </div>
      )}
    </>
  );
};

export default Navbar;
