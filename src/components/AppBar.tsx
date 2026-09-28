/* Barra do topo com o logotipo Oxe Online */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconLogo } from "./static/icons/IconLogo";
import "./AppBar.css";

export default function AppBarComp() {
  return (
    <AppBar position="static" component="header">
      <Toolbar className="app-bar">
        <a href={import.meta.env.BASE_URL} className="logo-link" aria-label="Oxe Online — início">
          <IconLogo sx={{ height: 33, width: 205 }} aria-hidden="true" />
        </a>
      </Toolbar>
    </AppBar>
  );
}
/* Fim de AppBar.tsx */
