import { ControlPointOutlined } from "@mui/icons-material";

let field = [];
let size = 8;
let firstPlayer = true;
let gameStarted = false;

let time = 15;
let callback = null;

setInterval(() => {
  if (!gameStarted) return;
  if (time > 0) {
    --time;
    if (callback) callback(time);
  }
}, 1000);

function checkRule(x, y, dx, dy) {
  let acc = [];
  let fig = 0;

  for (let i = 0; i < size; i++) {
    let posY = y + dy * i;
    let posX = x + dx * i;

    if (posX < 0 || posX >= size || posY < 0 || posY >= size) continue;

    if (fig > 0 && fig == field[posY][posX]) {
      acc.push({ x: posX, y: posY, fig });
      if (acc.length >= 5) return acc;
    } else {
      fig = field[posY][posX];
      acc = [{ x: posX, y: posY, fig }];
    }
  }

  return [];
}

function clearField() {
  field = [];
  for (let i = 0; i < size; i++) {
    field[i] = [];
    for (let j = 0; j < size; j++) {
      field[i][j] = 0; //((i + j) % 2) + 1;
    }
  }

  console.log("field is empty");
}

export default {
  setSize(s) {
    size = s;
  },
  getTime() {
    return time;
  },
  setTime(Time) {
    time = Time;
  },
  resetGame() {
    clearField();
    gameStarted = false;
  },
  updateGame(state, cb) {
    if (state == "start") {
      gameStarted = false;
      callback = cb;
      this.resetGame();
      time = 15;
      return;
    }
    if (state == "player1" || state == "player2") {
      callback = cb;
      firstPlayer = state == "player1";
      gameStarted = true;
      return;
    }

    if (state == "end") {
      time = 15;
      gameStarted = false;
    }
  },
  setFigure(x, y) {
    if (field[y][x] == 0) {
      field[y][x] = firstPlayer ? 1 : 2;
      this.setTime(15);
      let isWinner = this.check();
      if (isWinner) {
        return {
          step: true,
          state: "end",
          winner: firstPlayer * 1 + 1,
          cells: isWinner,
        };
      }

      firstPlayer = !firstPlayer;
      return { step: true, state: firstPlayer ? "player1" : "player2" };
    }

    return { step: false };
  },

  check() {
    let res = [];
    for (let i = 0; i < size; i++) {
      //rows
      res = checkRule(0, i, 1, 0);
      if (res.length) {
        return res;
      }
    }

    for (let i = 0; i < size; i++) {
      //cols
      res = checkRule(i, 0, 0, 1);
      if (res.length) {
        return res;
      }
    }

    for (let i = -3; i < size - 4; i++) {
      //diag1
      res = checkRule(i, 0, 1, 1);
      if (res.length) {
        return res;
      }
    }

    for (let i = 4; i < size + 3; i++) {
      //diag2
      res = checkRule(0, i, 1, -1);
      if (res.length) {
        return res;
      }
    }
  },

  getField() {
    return field;
  },

  surrender() {
    return { state: "end", winner: !firstPlayer };
  },
};
