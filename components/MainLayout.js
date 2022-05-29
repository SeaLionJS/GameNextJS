import {
  Typography,
  ThemeProvider,
  CssBaseline,
  Switch,
  AppBar,
  Toolbar,
  Link,
  Box,
} from "@mui/material";

import NextLink from "next/link";
import Head from "next/head";
import { useState } from "react";
import { darkTheme as dark, lightTheme as light } from "./themes";
import { useRouter } from "next/router";

export default function MainLayout({ children, title, description }) {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title ? `${title}` : "Game portal"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={selectedTheme === "light" ? light : dark}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <div>
              Темний режим:
              <Switch
                checked={selectedTheme === "dark"}
                onChange={toggleTheme}
              ></Switch>
            </div>
          </Toolbar>
        </AppBar>
        <main>{children}</main>
        <Box component="footer" sx={{ backgroundColor: "background.paper" }}>
          {router.pathname !== "/" ? (
            <NextLink href="/" passHref>
              <Link>Повернутися</Link>
            </NextLink>
          ) : (
            ""
          )}
          <Typography textAlign="center">©Bohdan Onyshchenko 2022</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
