import React from "react";
import Card from "../card";
import { useSelector } from "react-redux";

const DrawBottom = () => {
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);

  const highlightCard = (i) => {
    //TODO
    return null;
  };

  return (
    <>
      <div
        className={`w-full flex flex-row flex-auto flex-shrink-0 antialiased bg-blue-900 text-gray-800`}
      >
        <div className="flex items-center pl-6 h-40 border-b border-gray-800 mr-40">
          {gameState.turnPlayer === 1 &&
            Object.keys(playerOne.cards).map((color) => {
              const amount = playerOne.cards[color];
              const result = Array.from(Array(amount).keys()).map((_, i) => (
                <Card color={color} click={() => highlightCard(i)} />
              ));

              return result;
            })}
          {gameState.turnPlayer === 2 &&
            Object.keys(playerTwo.cards).map((color) => {
              const amount = playerTwo.cards[color];
              const result = Array.from(Array(amount).keys()).map((_, i) => (
                <Card color={color} click={() => highlightCard(i)} />
              ));

              return result;
            })}
        </div>
      </div>
    </>
  );
};

export default DrawBottom;
