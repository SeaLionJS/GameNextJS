import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
