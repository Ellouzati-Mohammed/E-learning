import React from "react";
import MainLayout from "./Layouts/MainLayout.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
});

function App() {
  return (
  <ThemeProvider theme={theme}>
    <MainLayout>
       <AppRoutes />
    </MainLayout>
  </ThemeProvider>
  );
}

export default App;

