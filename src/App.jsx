import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Preferences from "./components/preference/Preferences.jsx";
import SignIn from "./components/Authentication/sign_in/SignIn.jsx";
import { useAuthenticationStatus } from "@nhost/react";

function App() {
  
  const { isAuthenticated } = useAuthenticationStatus();
  
  return (<>
    <Navbar/>
    {/*<Preferences loggedIn={loggedIn}/>*/}
    <div className={"min-h-screen transition-colors duration-200"}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" gap-8">
          {isAuthenticated ? <News/> : <SignIn/>}
        </div>
      </main>
    </div>
  </>);
}

export default App;
