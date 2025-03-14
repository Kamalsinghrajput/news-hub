import {Newspaper, Settings, LogOut, Save} from "lucide-react";
import {useSignOut} from "@nhost/react";

const Navbar = ({isAuthenticated}) => {
  const {signOut} = useSignOut();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-lg backdrop-blur-sm">
              <Newspaper className="text-white" size={28}/>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              NewsHub
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="ml-2 flex items-center space-x-2 bg-blackrounded-full px-4 py-2 transition-colors duration-200 ">
              <Save size={20} className="text-white"/>
              <span className="text-white text-sm font-medium">Saved</span>
            </button>
            <button
              className="ml-2 flex items-center space-x-2 bg-blackrounded-full px-4 py-2 transition-colors duration-200 ">
              <Settings size={20} className="text-white"/>
              <span className="text-white text-sm font-medium">Setting</span>
            </button>
            {isAuthenticated && <button
              className="ml-2 flex items-center space-x-2 bg-blackrounded-full px-4 py-2 transition-colors duration-200 cursor-pointer"
              onClick={handleLogout}>
              <LogOut size={20} className="text-white"/>
              <span className="text-white text-sm font-medium">Logout</span>
            </button>}
          
          </div>
        </div>
      </div>
    </header>);
};

export default Navbar;
