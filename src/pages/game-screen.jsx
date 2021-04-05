import React from "react";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";

const GameScreen = () => {
  return (
    <div className="flex flex-col">
      <img src={gameMap} alt="Game Map" className="self-center" />
    </div>
  );
};

export default GameScreen;
