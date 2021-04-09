import React, { useContext, useEffect } from "react";
import { Context } from "../store/store";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";

const GameScreen = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "IN_GAME" });
  }, [dispatch, state.gameState]);

  return (
    <div className="flex flex-col">
      <img src={gameMap} alt="Game Map" className="self-center mt-16" />
      {/* <img src={scoringBorder} alt="ScoreBorder" /> */}
    </div>
  );
};

export default GameScreen;
