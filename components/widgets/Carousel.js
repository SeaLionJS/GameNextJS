import Carousel from "react-material-ui-carousel";
import React from "react";
import { Paper, Button } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

function Item(props) {
  //for test
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default function CarouselWidget() {
  const items = [
    {
      name: "Random Name #1",
      description: "Hello Earth!",
    },
    {
      name: "Random Name #2",
      description: "Hello Mars!",
    },
    {
      name: "Random Name #3",
      description: "Hello Venus!",
    },
  ];

  return (
    <Carousel
      NextIcon={<SkipNextIcon />}
      PrevIcon={<SkipPreviousIcon />}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          backgroundColor: "#2e7d32",
          borderRadius: "50%",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#2e7d32",
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: "20px",
          textAlign: "center",
        },
      }}
      navButtonsAlwaysVisible
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
