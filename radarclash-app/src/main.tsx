import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "@/components/theme-provider"
import App from './App';
import "./index.css";
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const GOOGLE_CLIENT_ID = "267799353512-gsdlj0lcd8s1icdmtsf3kbldnev1i5ij.apps.googleusercontent.com"

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
        <Toaster position="top-center" />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);