import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleAuthProvider } from "@firebase/auth";

const GOOGLE_CLIENT_ID = "327681617637-qrdeuf0f73cfaletsmo5qalh12tm074u.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
   
  </StrictMode>
);
