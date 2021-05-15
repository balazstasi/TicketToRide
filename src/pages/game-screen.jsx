import React, { useEffect, useState } from "react";
import { Button } from "../common/button";
import Map from "../components/map";
import Sidebar from "../components/player-stats/sidebar";
import DrawSidebar from "../components/draw-sidebar/draw-sidebar";
import DrawBottom from "../components/draw-sidebar/draw-bottom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { drawCard, setTurnPlayer } from "../store/slices/gameSlice";
import { resetDeck } from "../store/slices/gameSlice";
import { drawCardOne } from "../store/slices/playerOneSlice";
import { drawCardTwo } from "../store/slices/playerTwoSlice";

const GameScreen = () => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);

  useEffect(() => {
    [1, 2, 3, 4].forEach((_) => d(drawCardOne()));
    [1, 2, 3, 4].forEach((_) => d(drawCardTwo()));
  }, [d]);

  return (
    <div className="h-screen">
      <div className="absolute">
        <Sidebar />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-full">
          <div className="flex flex-row self-center">
            <div>
              <Button onClick={() => d(drawCard())}>Draw New Card</Button>
            </div>
            <div>
              <Button onClick={() => d(resetDeck())}>Reset Draw Deck</Button>
            </div>
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
          </div>

          <Map />
          <DrawBottom />
        </div>
        <DrawSidebar />
      </div>
    </div>
  );
};

export default GameScreen;
