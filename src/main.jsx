import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Preferences from "./components/preference/Preferences.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { NhostProvider } from "@nhost/react";
import { nhost } from "./lib/nhost.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>

    <Navbar />
    <Preferences />
  </StrictMode>
);
