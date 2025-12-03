import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import "./styles/theme.css";

import { initTheme } from "./utils/theme";

// Initialize day/night theme before rendering
initTheme();

console.log("VITE_OPENWEATHER_KEY (client):", import.meta.env.VITE_OPENWEATHER_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
