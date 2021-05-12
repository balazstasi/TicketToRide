import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTurnPlayer } from "../../store/slices/gameSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  useEffect(() => {
    dispatch(setTurnPlayer(1));
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <div className="text-blue-100">
      <h1 className="text-3xl font-semibold">Player {gameState.turnPlayer}</h1>

      <ul>
        Cards:
        {Object.keys(playerOne.cards).map((card) => {
          const amount = playerOne.cards[card];
          return amount > 0 && <li>{card + ": " + playerOne.cards[card]}</li>;
        })}
        {Object.keys(playerTwo.cards).map((card) => {
          const amount = playerTwo.cards[card];
          return amount > 0 && <li>{card + ": " + playerTwo.cards[card]}</li>;
        })}
      </ul>

      <p>Score: {gameState.turnPlayer === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p>Markers: {gameState.turnPlayer === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p>Train Cards: {gameState.turnPlayer === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p>Destination Cards: {gameState.turnPlayer === 1 ? playerOne.trains : playerTwo.trains}</p>
    </div>
  );
};

export default Stats;
