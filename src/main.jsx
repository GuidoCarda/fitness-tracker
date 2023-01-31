import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { WorkoutsProvider } from "./context/WorkoutsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutsProvider>
        <App />
      </WorkoutsProvider>
    </AuthProvider>
  </React.StrictMode>
);
