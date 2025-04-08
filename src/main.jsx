import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NhostProvider } from "@nhost/react";
import { nhost, apolloClient } from "./lib/nhost.js";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ReduxProvider store={store}>
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </NhostProvider>
  </ReduxProvider>
  // </StrictMode>
);
