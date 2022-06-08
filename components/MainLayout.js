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
import Cookie from "js-cookie";

export default function MainLayout({
  children,
  title,
  description,
  additionalTool,
}) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const { UInfo } = state;

  useEffect(() => {
    const darkModeStorage = Storage.getDarkMode();
    let user = Cookie.get("UInfo");
    if (user) {
      user = JSON.parse(user);
      dispatch({ type: "UPDATE_USER", payload: user });
    }
    dispatch({ type: darkModeStorage ? "DARK_MODE_ON" : "DARK_MODE_OFF" });
  }, []);

  const toggleTheme = () => {
    console.log(state, darkMode);
    Storage.setDarkMode(!darkMode);
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  };

  const router = useRouter();

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

  const handleLogout = () => {
    dispatch({ type: "UPDATE_USER", payload: {} });
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
              justifyContent: "center",
              flexWrap: "wrap",
              // maxWidth: 1000,
            }}
          >
            {additionalTool ? additionalTool : ""}
            <div>
              <Button
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 15,
                }}
                variant="contained"
                color="success"
                onClick={handleShowMenu}
              >
                {UInfo.name ? UInfo.name : "Меню"}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem key="theme-key">
                  <ListItemText>
                    Темний режим:
                    <Switch checked={darkMode} onChange={toggleTheme}></Switch>
                  </ListItemText>
                </MenuItem>
                {UInfo.name ? (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Вийти</ListItemText>
                  </MenuItem>
                ) : (
                  [
                    <MenuItem onClick={() => handleMenu("/login")} key="enter">
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Увійти</ListItemText>
                    </MenuItem>,
                    <MenuItem onClick={() => handleMenu("/register")} key="reg">
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
                <Link>Головна сторінка</Link>
              </NextLink>
            ) : (
              ""
            )}
            <span> ©Bohdan Onyshchenko 2022</span>
          </Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
