import React from "react";
import classes from "../../styles/classes.module.css";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function GCell({ figure }) {
  //cross, circle

  let gcell = "";
  switch (figure) {
    case "circle":
      gcell = <ExpandCircleDownIcon />;
      break;
    case "cross":
      gcell = <LocalHospitalIcon />;
      break;
  }

  return <div className={classes.gCell}>{{ gcell }}</div>;
}
