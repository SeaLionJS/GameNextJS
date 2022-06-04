import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: false,
  game: {
    player1: "Світло",
    player2: "Темрява",
    winner: 0,
    state: "start", //player1, player2, end
  },
};

//console.log(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "GAME_MAKE_STEP":
      return { ...state, game: { ...state.game, state: action.payload } };
    case "GAME_FINISH":
      return {
        ...state,
        game: { ...state.game, state: "end", winner: action.payload },
      };
    case "GAME_START":
      return {
        ...state,
        game: {
          ...state.game,
          state: action.payload.firstStep ? "player2" : "player1",
        },
      };
    case "GAME_CHANGE_NAMES":
      const player1 =
        action.payload.player === "player1"
          ? action.payload.value
          : state.game.player1;
      const player2 =
        action.payload.player === "player2"
          ? action.payload.value
          : state.game.player2;
      return { ...state, game: { ...state.game, player1, player2 } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
