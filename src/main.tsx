/* Ponto de entrada: tema do Material UI e aplicação */
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./styles/index.css";

const theme = createTheme({
  palette: { primary: { main: "#c2410c" }, secondary: { main: "#050C26" } },
  typography: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
/* Fim de main.tsx */
