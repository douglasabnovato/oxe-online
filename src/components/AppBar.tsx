/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { IconLogo } from "./static/icons/IconLogo";

import "./AppBar.css"

export default function AppBarComp() {
  
  return (
    <>
      <AppBar position="static">
        <Toolbar
          className="app-bar"
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IconLogo
              sx={{
                height: 33,
                width: 205,
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}