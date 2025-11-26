import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContext.Provider value={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeContext.Provider>
);
