import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout";

import description from "../components/JSON/mainDescription.json";
import { Grid, Typography } from "@mui/material";
import CarouselWidget from "../components/widgets/Carousel";
import { useSnackbar } from "notistack";

import MainDescriptionBlock from "../components/MainDescriptionBlock";

export default function Main() {
  //console.log(description);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    enqueueSnackbar("This is working!", { variant: "info" });
  }, []);
  return (
    <MainLayout>
      <Typography component="h1" variant="h4" align="center">
        Ласкаво просимо!
      </Typography>
      <CarouselWidget />
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
