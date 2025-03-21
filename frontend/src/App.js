import React from 'react';
// Comment out unused imports
// import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Remove Container since it's unused
import { Button, Box, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';
// Comment out since it's not being used
// import { msalConfig } from "./authConfig";
import './App.css';

// Comment out since these are unused
// MSAL instance
// const msalInstance = new PublicClientApplication(msalConfig);

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0078d4', // Azure blue
    },
    secondary: {
      main: '#ff9900', // AWS orange
    },
  },
});

// Also comment out the LoginContent function since it's not used
/*
function LoginContent() {
  return (
    ...
  );
}
*/

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Temporarily bypass authentication for development */}
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;