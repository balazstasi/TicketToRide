import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
  gameState: "",
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
