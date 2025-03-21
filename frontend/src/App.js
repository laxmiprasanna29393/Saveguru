import React from 'react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Button, Box, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';
import { msalConfig } from "./authConfig";
import './App.css';

// MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

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

// Login component
function LoginContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 2
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        SAVEGURU
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Unified Cloud Cost Optimization Platform
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 600, mb: 4 }}>
        Monitor, analyze, and optimize your cloud costs across platforms from a single dashboard.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => msalInstance.loginRedirect()}
      >
        Sign in with Microsoft
      </Button>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Temporarily bypass authentication for development */}
      <Dashboard />
      {/* Comment out the MSAL provider for now
      <MsalProvider instance={msalInstance}>
        <div className="App">
          <AuthenticatedTemplate>
            <Dashboard />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <LoginContent />
          </UnauthenticatedTemplate>
        </div>
      </MsalProvider>
      */}
    </ThemeProvider>
  );
}
export default App;