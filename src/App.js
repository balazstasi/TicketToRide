import React, { useContext, useEffect } from "react";
import Routes from "./routes/Routes";
import { Context } from "./store/store";

import { useDispatch, useSelector } from "react-redux";

function App() {
  const [state] = useContext(Context);

  const gamePhase = useSelector((state) => state.game.gamePhase);

  useEffect(() => {
    console.log(state);
    console.log(gamePhase);
  }, [state]);

  return <Routes></Routes>;
}

export default App;
