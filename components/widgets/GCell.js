import React from "react";
import classes from "../../styles/classes.module.css";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Store } from "../../utils/store";
import { useContext } from "react";

export default function GCell({ figure, x, y, active }) {
  //cross, circle

  let act = false;

  for (let i = 0; i < active.length; i++) {
    if (active[i].x * 1 == x * 1 && active[i].y * 1 == y * 1) {
      act = true;
      break;
    }
  }

  const { state } = useContext(Store);
  const { darkMode } = state;

  let gcell;
  switch (figure) {
    case "circle":
      gcell = (
        <ExpandCircleDownIcon
          sx={{
            width: "100%",
            height: "100%",
            color: darkMode ? "#37bd66" : "#2e7d32",
          }}
        />
      );
      break;
    case "cross":
      gcell = (
        <LocalHospitalIcon
          sx={{
            width: "100%",
            height: "100%",
            color: darkMode ? "#b5a63f" : "#3f51b5",
          }}
        />
      );
      break;
    default:
      gcell = (
        <LocalHospitalIcon
          sx={{
            width: "100%",
            height: "100%",
            color: "transparent",
          }}
        />
      );
      break;
  }

  return (
    <div
      data-x={x}
      data-y={y}
      className={act ? classes.gcellactive : classes.gcell}
      style={{
        background: darkMode
          ? "radial-gradient(rgb(59 92 126), rgb(33 63 88))"
          : "radial-gradient(#e9dbc7, #ebc89d)",
      }}
    >
      {gcell}
    </div>
  );
}
