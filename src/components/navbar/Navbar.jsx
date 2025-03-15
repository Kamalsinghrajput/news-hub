import { Newspaper, Settings, LogOut, Save, X } from "lucide-react";
import { useSignOut } from "@nhost/react";
import { useState } from "react";
import Preferences from "../preference/Preferences";

const Navbar = ({
  isAuthenticated,
  userPreferences,
  userId,
  setUserPreferences,
  toggleSavedArticles,
}) => {
  const { signOut } = useSignOut();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

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
              <h1 className="text-2xl font-bold text-white tracking-tight">
                NewsHub
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSavedArticles}
                className="cursor-pointer ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200"
              >
                <Save size={20} className="text-white" />
                <span className="text-white text-sm font-medium">
                  Saved Articles
                </span>
              </button>
              <button
                className="cursor-pointer ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings size={20} className="text-white" />
                <span className="text-white text-sm font-medium">Settings</span>
              </button>
              {isAuthenticated && (
                <button
                  className="cursor-pointer ml-2 flex items-center space-x-2 bg-black rounded-full px-4 py-2 transition-colors duration-200 cursor-pointer"
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
          <Preferences
            userPreferences={userPreferences}
            userId={userId}
            setUserPreferences={setUserPreferences}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
