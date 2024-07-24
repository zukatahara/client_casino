import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./icon.css";
import "./discount.css";
import "./styles/tablist.css";
import Providers from "./components/providers.tsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
