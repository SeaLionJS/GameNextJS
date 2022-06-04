import React from "react";
import { Store } from "../../utils/store";
import { useContext, useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  Typography,
  TextField,
  Card,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";
import classes from "../../styles/classes.module.css";
import Dialog from "./Dialog";

export default function GameControl() {
  const { state, dispatch } = useContext(Store);
  const { game, darkMode } = state;
  let items = "";
  const [dialogVisible, openDialog] = useState(false);

  const changeName = (value, player) => {
    dispatch({ type: "GAME_CHANGE_NAMES", payload: { value, player } });
  };

  const surrender = () => {
    openDialog(false);
    dispatch({
      type: "GAME_FINISH",
      payload: game.state === "player1" ? "player2" : "player1",
    });
  };

  const startGame = () => {
    dispatch({
      type: "GAME_START",
      payload: { firstStep: Boolean(Math.round(Math.random())) },
    });
  };

  const resetGame = () => {
    dispatch({
      type: "GAME_RESET",
    });
  };

  const draw = () => {
    dispatch({
      type: "GAME_FINISH",
      payload: "draw",
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
            sx={{ margin: 1, width: 150 }}
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
            sx={{ margin: 1, width: 150 }}
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
          <div
            className={
              game.state === "player1"
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
              game.state === "player2"
                ? classes.activeplayer
                : classes.inactiveplayer
            }
          >
            <ExpandCircleDownIcon fontSize="meduim" />
            {game.player2}
          </div>
          <Typography variant="h6">{`Залишилось ${game.time} секунд`}</Typography>
          <div>
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: 0.2 }}
              onClick={draw}
            >
              Нічия
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: 0.2 }}
              onClick={() => openDialog(true)}
            >
              Здатися
            </Button>
          </div>
          <Dialog
            visible={dialogVisible}
            onAgree={surrender}
            onCancel={() => openDialog(false)}
          />
        </Card>
      );
      break;
    case "end":
      let text = `Переможець ${
        game.winner === "player1" ? game.player1 : game.player2
      } `;
      if (game.winner == "draw") text = "Гра не виявила переможця! ";
      items = (
        <Card>
          <div style={{ padding: 5 }}>
            <span>{text}</span>
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: 0.2 }}
              onClick={resetGame}
            >
              Повернутися
            </Button>
          </div>
        </Card>
      );

      break;
    default:
      items = "Невідомий стан!";
      break;
  }

  return items;
}
