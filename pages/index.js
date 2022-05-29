import React from "react";
import MainLayout from "../components/MainLayout";

import NextLink from "next/link";
import description from "../components/JSON/mainDescription.json";

import { Grid, Typography } from "@mui/material";

import MainDescriptionBlock from "../components/MainDescriptionBlock";

export default function Main() {
  //console.log(description);
  return (
    <MainLayout>
      <Typography component="h1" variant="h4" align="center">
        Welcome to game site!
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {description.map((e, ind) => (
          <Grid item xs={12} sm={6} md={4} key={ind}>
            <MainDescriptionBlock {...e} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
}
