import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  turnPlayer: "Balazs",
  gameState: "",
  gamePhase: "",
  gameCode: "",
  1: {
    trains: 45,
    cards: {
      blue: 0,
      green: 0,
      yellow: 0,
      rainbow: 0,
      black: 0,
      purple: 0,
      white: 0,
    },
    destinations: [],
  },
  2: {
    trains: 45,
    cards: {
      blue: 0,
      green: 0,
      yellow: 0,
      rainbow: 0,
      black: 0,
      purple: 0,
      white: 0,
    },
    destinations: [],
  },
  3: {
    trains: 45,
    cards: {
      blue: 0,
      green: 0,
      yellow: 0,
      rainbow: 0,
      black: 0,
      purple: 0,
      white: 0,
    },
    destinations: [],
  },
  // 4: {
  //   trains: 45,
  //   cards: [
  //     { blue: 0 },
  //     { green: 0 },
  //     { yellow: 0 },
  //     { rainbow: 0 },
  //     { black: 0 },
  //     { purple: 0 },
  //     { white: 0 },
  //   ],
  //   destinations: [],
  // },
};

const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
