import React, { useContext, useEffect } from "react";
import Routes from "./routes/Routes";
import { Context } from "./store/store";

function App() {
  const [state] = useContext(Context);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <Routes></Routes>;
}

export default App;
