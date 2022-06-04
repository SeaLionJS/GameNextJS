import React, { useState } from "react";
import GCell from "./GCell";
import classes from "../../styles/classes.module.css";
import controller from "../../controllers/fiveinrow";
import { Store } from "../../utils/store";
import { useContext } from "react";

controller.setSize(8);
controller.resetGame();

export default function GBoard({ size = 8 }) {
  const figs = ["", "cross", "circle"];
  const field = controller.getField();

  const { state, dispatch } = useContext(Store);
  const { game } = state;
  //console.log(state, game);

  const clickHandler = (e) => {
    if (game.state === "end" || game.state === "start") return;

    let elem = e.target;
    let cords = { x: -1, y: -1 };
    for (let i = 0; i < 5; i++) {
      let x = elem.getAttribute("data-x");
      if (!x) {
        elem = elem.parentNode;
        continue;
      }
      if (x == -1) {
        return;
      } else {
        cords = { x: x * 1, y: elem.getAttribute("data-y") * 1 };
        break;
      }
    }

    let gameInfo = controller.setFigure(cords.x, cords.y);
    if (gameInfo.step) {
      dispatch({ type: "GAME_MAKE_STEP", payload: gameInfo.state });
    }
    //console.log(cords);
  };

  const cells = field.map((row, rowInd) => (
    <tr key={`r${rowInd}`}>
      {row.map((cell, colInd) => {
        //console.log("row map", cell);
        return (
          <td key={`c${colInd}`}>
            <GCell figure={figs[cell]} x={colInd} y={rowInd} />
          </td>
        );
      })}
    </tr>
  ));

  //console.log(field, cells);

  return (
    <div className={classes.gcontainer} data-x={-1} onClick={clickHandler}>
      <table className={classes.gtable}>
        <tbody>{cells}</tbody>
      </table>
    </div>
  );
}
