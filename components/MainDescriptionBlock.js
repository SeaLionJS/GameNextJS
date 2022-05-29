import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";
import NextLink from "next/link";
import classes from "../styles/classes.module.css";

export default function MainDescriptionBlock({
  name,
  description,
  image,
  link = "",
}) {
  return (
    <NextLink href={link} passHref>
      <Card
        sx={{ height: 450, overflowY: "auto" }}
        className={classes.hoverBlock}
      >
        <CardContent>
          <Typography variant="h4" component="h2" textAlign="center">
            {name}
          </Typography>
          <Typography component="div" textAlign="center">
            <Image src={image} height={300} width={200} />
          </Typography>
          <Typography variant="body1" component="h3" textAlign="justify">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </NextLink>
  );
}
