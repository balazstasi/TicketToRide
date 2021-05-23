import React, { useEffect, useState } from "react";
import { Button } from "../common/button";
import Map from "../components/map";
import Sidebar from "../components/player-stats/sidebar";
import DrawSidebar from "../components/draw-sidebar/draw-sidebar";
import DrawBottom from "../components/draw-sidebar/draw-bottom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTurnPlayer } from "../store/slices/gameSlice";
import { drawCardOne } from "../store/slices/playerOneSlice";
import { drawCardTwo } from "../store/slices/playerTwoSlice";
import { useHistory } from "react-router-dom";

const GameScreen = () => {
  const history = useHistory();
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const [scoreOpen, setScoreOpen] = useState(false);

  useEffect(() => {
    [1, 2, 3, 4].forEach((_) => d(drawCardOne()));
    [1, 2, 3, 4].forEach((_) => d(drawCardTwo()));
  }, [d]);

  return (
    <div className="h-screen">
      <div className="absolute">
        <Sidebar click={() => setScoreOpen(!scoreOpen)} />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-full">
          <div className="flex flex-row self-center">
            For Debugging:
            <div>
              <Button highlighted={gameState.turnPlayer === 1} onClick={() => d(setTurnPlayer(1))}>
                Player 1
              </Button>
            </div>
            <div>
              <Button highlighted={gameState.turnPlayer === 2} onClick={() => d(setTurnPlayer(2))}>
                Player 2
              </Button>
            </div>
            <div>
              <Button onClick={() => history.push("/end-game")}>End Game</Button>
            </div>
          </div>
          <Map />
          <DrawBottom isOpened={scoreOpen} />
        </div>
        <DrawSidebar />
      </div>
    </div>
  );
};

export default GameScreen;
