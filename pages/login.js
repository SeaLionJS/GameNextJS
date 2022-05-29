import React from "react";
import MainLayout from "../components/MainLayout";

import NextLink from "next/link";

import { List, ListItem } from "@mui/material";

export default function Login() {
  return (
    <MainLayout>
      <div>Welcome to game site!</div>
      <List sx={{ width: "100%", maxWidth: 200 }}>
        <ListItem>
          <NextLink href="/fiveinrow">П'ять у ряд</NextLink>
        </ListItem>
        <ListItem>
          <NextLink href="/blog">Блог</NextLink>
        </ListItem>
        <ListItem>
          <NextLink href="/about">Про проєкт</NextLink>
        </ListItem>
      </List>
    </MainLayout>
  );
}
