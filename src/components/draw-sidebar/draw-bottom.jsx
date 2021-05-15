import React, { useState, useEffect } from "react";
import { getRandomColor } from "../../utils/getRandomColor";
import Card from "../card";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNumColors } from "../../utils/getNumColors";

const DrawBottom = () => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);

  return (
    <>
      <div
        className={`w-full flex flex-row flex-auto flex-shrink-0 antialiased bg-blue-900 text-gray-800`}
      >
        <div className="flex items-center pl-6 h-40 border-b border-gray-800 mr-40">
          {/* {currentPlayerDeck?.map((cardColor) => (
            <div className="flex flex-grow mx-2">
              <Card color={cardColor} click={() => null} />
            </div>
          ))} */}
          {Object.keys(playerOne.cards).map((color) => {
            const amount = playerOne.cards[color];
            const result = Array.from(Array(amount).keys()).map((_) => (
              <Card color={color} click={() => null} />
            ));

            return result;
          })}
        </div>
      </div>
    </>
  );
};

export default DrawBottom;
