import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  gameState: "",
  gamePhase: "",
  trainColors: [
    "red",
    "green",
    "blue",
    "purple",
    // TODO: ezek a szinek nincsenek tailwindbe
    // "black",
    // "white",
    // "orange",
    "yellow",
    "rainbow",
  ],
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
