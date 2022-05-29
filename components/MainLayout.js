import {
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import NextLink from "next/link";
import Head from "next/head";
import { createTheme } from "@mui/material";
import { useState } from "react";
import { Switch } from "@mui/material";

import { useRouter } from "next/router";

const light = createTheme({
  palette: {
    mode: "light",
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#c9d9e8",
      paper: "#f1eee6",
    },
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

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
        <Switch
          checked={selectedTheme === "dark"}
          onChange={toggleTheme}
        ></Switch>
        <Container>{children}</Container>
        <footer>
          {router.pathname !== "/" ? (
            <NextLink href="/">
              <a href="/">Повернутися</a>
            </NextLink>
          ) : (
            ""
          )}
          <Typography>©Bohdan Onyshchenko 2022</Typography>
        </footer>
      </ThemeProvider>
    </>
  );
}
