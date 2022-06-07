import React from "react";
import { Store } from "../../utils/store";
import { useContext, useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Typography, TextField, Grid, Button, Card } from "@mui/material";
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
        <Card>
          <Grid
            container
            sx={{ maxWidth: 1000 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={5} md={3} align="center">
              <TextField
                onChange={(e) => changeName(e.target.value, "player1")}
                id="player1"
                value={game.player1}
                label="Гравець 1"
                variant="outlined"
                size="small"
                sx={{ margin: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2} md={3} align="center">
              <LocalHospitalIcon fontSize="small" />
              <Typography component="span" variant="h5" sx={{ padingTop: 10 }}>
                VS
              </Typography>
              <ExpandCircleDownIcon fontSize="small" />
            </Grid>
            <Grid item xs={12} sm={5} md={3} align="center">
              <TextField
                onChange={(e) => changeName(e.target.value, "player2")}
                id="player2"
                value={game.player2}
                label="Гравець 2"
                variant="outlined"
                size="small"
                sx={{ margin: 1 }}
              />
            </Grid>
            <Grid item xs={5} sm={6} md={2.5} align="center">
              <div style={{ padding: 5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={startGame}
                >
                  Почати гру
                </Button>
              </div>
            </Grid>
          </Grid>
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
          <Grid
            container
            sx={{ maxWidth: 1000 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item sm={12} xs={12} align="center">
              <Typography variant="h6">{`Залишилось ${Math.floor(
                game.time / 10
              )}${game.time % 10} секунд`}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
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

  return (
    <>
      <Dialog
        visible={dialogVisible}
        header="Вам буде зарахована поразка"
        type="warning"
        text="Ви впевнені?"
        onAgree={surrender}
        onCancel={() => openDialog(false)}
      />
      {items}
    </>
  );
}
