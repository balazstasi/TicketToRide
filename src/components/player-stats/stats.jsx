import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTurnPlayer } from "../../store/slices/gameSlice";
import Stat from "./stat";

const Stats = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(setTurnPlayer(1));
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <div className="text-blue-100 py-2 px-2 mt-2 flex items-center flex-col">
      <Stat player={1} highlighted={gameState.turnPlayer === 1} />
      <Stat player={2} highlighted={gameState.turnPlayer === 2} />
    </div>
  );
};

export default Stats;
