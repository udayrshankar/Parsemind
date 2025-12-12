// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TransitionProvider } from "./components/TransitionContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <App />
      </TransitionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
