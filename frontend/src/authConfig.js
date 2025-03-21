export const msalConfig = {
  auth: {
    clientId: "0d32fb2d-3f10-4b6d-8070-e4d814dc3f95", // Replace with your Azure AD app registration client ID
    authority: "https://login.microsoftonline.com/4b43c1c6-ef9c-4612-ad6c-794affc6a187", // Replace with your tenant ID
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};

// Add additional scopes if your app needs to access Azure Management APIs
export const managementApiRequest = {
  scopes: ["https://management.azure.com/user_impersonation"]
};