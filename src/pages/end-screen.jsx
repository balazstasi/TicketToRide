import React, { useEffect } from "react";
import Stat from "../components/player-stats/stat";
import { useSelector } from "react-redux";
import { Button } from "../common/button";
import { useHistory } from "react-router-dom";
import { syncAction } from "..";
import { endGame } from "../store/slices/gameSlice";

const EndScreen = () => {
  const gameState = useSelector((state) => state.game);
  const history = useHistory();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  return (
    <div className="text-center flex flex-col align-middle">
      <h1 className="text-4xl text-center my-6">Game Ended!</h1>
      <h2 className="text-xl text-center font-bold">
        Winner is: {playerOne.score > playerTwo.score ? playerOne.name : playerTwo.name} by{" "}
        {Math.abs(playerOne.score - playerTwo.score)} points!
      </h2>
      <div className="self-center text-center flex flex-row align-middle justify-center mt-12">
        <Stat player={1} highlighted={true} />

        <Stat player={2} highlighted={true} />
      </div>
      <div className="w-1/4 mt-6 self-center text-md text-center">
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          Start Again
        </Button>
      </div>
    </div>
  );
};

export default EndScreen;
