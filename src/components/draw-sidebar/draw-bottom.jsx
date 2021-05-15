import React, { useState, useEffect } from "react";
import { getRandomColor } from "../../utils/getRandomColor";
import Card from "../card";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const DrawBottom = () => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const [currentPlayerDeck, setCurrentPlayerDeck] = useState([]);
  const gameState = useSelector((state) => state.game);

  useEffect(() => {
    console.log(currentPlayerDeck);
  }, [currentPlayerDeck, gameState.turnPlayer, playerOne.deck, playerTwo.deck]);
  return (
    <>
      <div
        className={`w-full flex flex-row flex-auto flex-shrink-0 antialiased bg-blue-900 text-gray-800`}
      >
        {/* <div className="fixed flex flex-row justify-between bg-blue-900 h-full shadow-lg w-full"> */}
        <div className="flex items-center pl-6 h-40 border-b border-gray-800 mr-40">
          {currentPlayerDeck?.map((cardColor) => (
            <div className="flex flex-grow mx-2">
              <Card color={cardColor} click={() => null} />
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DrawBottom;
