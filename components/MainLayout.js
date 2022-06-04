import {
  Typography,
  ThemeProvider,
  CssBaseline,
  Switch,
  AppBar,
  Toolbar,
  Link,
  Box,
  Menu,
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import NextLink from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { darkTheme as dark, lightTheme as light } from "./themes";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/store";
import Storage from "../utils/localStorage";

export default function MainLayout({
  children,
  title,
  description,
  additionalTool,
}) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  useEffect(() => {
    const darkModeStorage = Storage.getDarkMode();
    dispatch({ type: darkModeStorage ? "DARK_MODE_ON" : "DARK_MODE_OFF" });
  }, []);

  const toggleTheme = () => {
    console.log(state, darkMode);
    Storage.setDarkMode(!darkMode);
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  };

  const router = useRouter();
  const isUserConfirmed = false;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenu = (path) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title}` : "Game portal"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={darkMode ? dark : light}>
        <CssBaseline />
        <AppBar position="static" sx={{ padding: 1 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              maxWidth: 1000,
            }}
          >
            {additionalTool ? additionalTool : ""}
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={handleShowMenu}
              >
                Меню
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {isUserConfirmed ? (
                  <MenuItem onClick={() => handleMenu("/logout")}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Вийти</ListItemText>
                  </MenuItem>
                ) : (
                  [
                    <MenuItem key="theme-key">
                      <ListItemText>
                        Темний режим:
                        <Switch
                          checked={darkMode}
                          onChange={toggleTheme}
                        ></Switch>
                      </ListItemText>
                    </MenuItem>,
                    <MenuItem
                      onClick={() => handleMenu("/login")}
                      key="login-key"
                    >
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Увійти</ListItemText>
                    </MenuItem>,
                    <MenuItem
                      onClick={() => handleMenu("/register")}
                      key="register-key"
                    >
                      <ListItemIcon>
                        <AppRegistrationIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Регістрація</ListItemText>
                    </MenuItem>,
                  ]
                )}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <main>{children}</main>
        <Box component="footer" sx={{ backgroundColor: "background.paper" }}>
          <Typography textAlign="center">
            {router.pathname !== "/" ? (
              <NextLink href="/" passHref>
                <Link>Повернутися</Link>
              </NextLink>
            ) : (
              ""
            )}
            <span>©Bohdan Onyshchenko 2022</span>
          </Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
