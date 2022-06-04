import React from "react";
import { Store } from "../../utils/store";
import { useContext, useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Typography, TextField, Card, Button } from "@mui/material";
import classes from "../../styles/classes.module.css";

// const checkTime = (time, changeTimeF, timeEndF)=>{
//     changeTime()
// }

export default function GameControl() {
  const { state, dispatch } = useContext(Store);
  const { game, darkMode } = state;
  let items = "";
  const [time, changeTime] = useState(15);

  const changeName = (value, player) => {
    dispatch({ type: "GAME_CHANGE_NAMES", payload: { value, player } });
  };

  const startGame = () => {
    dispatch({
      type: "GAME_START",
      payload: { firstStep: Boolean(Math.round(Math.random())) },
    });
  };

  const surrender = () => {
    dispatch({
      type: "GAME_FINISH",
      payload: { winner: game.state === "player1" ? "player2" : "player1" },
    });
  };

  const draw = () => {
    dispatch({
      type: "GAME_FINISH",
      payload: { winner: "draw" },
    });
  };

  switch (game.state) {
    case "start":
      items = (
        <Card sx={{ display: "flex", flexWrap: "wrap" }}>
          <TextField
            onChange={(e) => changeName(e.target.value, "player1")}
            id="player1"
            value={game.player1}
            label="Гравець 1"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
          />
          <div style={{ paddingTop: 14 }}>
            <LocalHospitalIcon fontSize="small" />
            <Typography component="span" variant="h5" sx={{ padingTop: 10 }}>
              VS
            </Typography>
            <ExpandCircleDownIcon fontSize="small" />
          </div>

          <TextField
            onChange={(e) => changeName(e.target.value, "player2")}
            id="player2"
            value={game.player2}
            label="Гравець 2"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
          />
          <div style={{ padding: 10 }}>
            <Button variant="outlined" size="medium" onClick={startGame}>
              Почати гру
            </Button>
          </div>
        </Card>
      );
      break;
    case "player1":
    case "player2":
      items = (
        <Card
          sx={{ display: "flex", flexWrap: "wrap" }}
          className={classes.gamecontrol}
        >
          <Button variant="outlined" size="small">
            Нічия
          </Button>
          <div
            className={
              game.state === "player2"
                ? classes.activeplayer
                : classes.inactiveplayer
            }
          >
            {game.player1}
            <LocalHospitalIcon fontSize="meduim" />
          </div>
          <div>
            <Typography component="div" variant="h6" sx={{ padingTop: 14 }}>
              VS
            </Typography>
          </div>
          <div
            className={
              game.state === "player1"
                ? classes.activeplayer
                : classes.inactiveplayer
            }
          >
            <ExpandCircleDownIcon fontSize="meduim" />
            {game.player2}
          </div>
          <Button variant="outlined" size="small">
            Здатися
          </Button>
        </Card>
      );
      break;
    case "end":
      items = `Переможець ${game.winner}`;
      break;
    default:
      items = "Невідомий стан!";
      break;
  }

  return items;
}
