let field = [];
let size = 8;
let firstPlayer = true;

function checkRule(x, y, dx, dy) {
  let acc = [];
  let fig = 0;

  for (let i = y; i < size + y; i + dy) {
    for (let j = x; j < size + x; j + dx) {
      if (j < 0 || j >= size || i < 0 || i >= size) continue;

      if (fig > 0 && fig == field[i][j]) {
        acc.push({ x: j, y: i, fig });
        if (acc.length >= 5) return acc;
      } else {
        fig = field[i][j];
        acc = [{ x: j, y: i, fig }];
      }
    }
  }

  return [];
}

function clearField() {
  firstPlayer = Boolean(Math.round(Math.random()));
  field = [];
  for (let i = 0; i < size; i++) {
    field[i] = [];
    for (let j = 0; j < size; j++) {
      field[i][j] = 0; //((i + j) % 2) + 1;
    }
  }
}

export default {
  setSize(s) {
    size = s;
  },
  resetGame(firstP) {
    clearField();
    firstPlayer = firstP;
  },
  setFigure(x, y) {
    if (field[y][x] == 0) {
      field[y][x] = firstPlayer * 1 + 1;
      //let isWinner = this.check();
      // if (isWinner) {
      //   return {
      //     step: true,
      //     state: "end",
      //     winner: firstPlayer * 1 + 1,
      //     cells: isWinner,
      //   };
      // }

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
