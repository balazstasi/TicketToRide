import React from "react";
import Card from "../card";
import CardStack from "../card-stack";
import { getRandomColor } from "../../utils/getRandomColor";
import { removeCard } from "../../store/slices/gameSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCardOne } from "../../store/slices/playerOneSlice";
import { addCardTwo } from "../../store/slices/playerTwoSlice";
import { setTurnPlayer } from "../../store/slices/gameSlice";
import { LOCOMOTIVE } from "../../constants/constants";

const DrawSidebar = () => {
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const drawCardForCurrentPlayer = (cardColor, i) => {
    if (gameState.turnPlayer === 1) {
      d(addCardOne(cardColor));
      if (playerOne.lastDrawnCard !== LOCOMOTIVE) {
        d(removeCard(i));
      }
      // d(setTurnPlayer(2));
      console.log("PLAYER 1 HAND", playerOne.hand);
    } else if (gameState.turnPlayer === 2) {
      d(addCardTwo(cardColor));
      playerTwo.lastDrawnCard !== LOCOMOTIVE && d(removeCard(i));

      // d(setTurnPlayer(1));
      console.log("PLAYER 2 HAND", playerOne.hand);
    }
  };

  const drawCardFromDeck = (cardColor) => {
    if (gameState.turnPlayer === 1) {
      d(addCardOne(cardColor));
      d(setTurnPlayer(2));
    } else if (gameState.turnPlayer === 2) {
      d(addCardTwo(cardColor));
      d(setTurnPlayer(1));
    }
  };

  return (
    <>
      <div className="z-0 min-h-screen h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 text-gray-800">
        <div className="fixed flex flex-col top-0 right-0 w-64 bg-blue-900 h-full">
          <div className="flex items-center pl-6 h-20 border-b border-gray-800">
            <div className="ml-1">
              <p className="ml-1 mt-4 text-3xl font-medium tracking-wide truncate text-blue-100 font-sans">
                Draw Cards
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between mt-1 flex-grow">
            {gameState?.deck.map((cardColor, i) => {
              return (
                <Card
                  color={cardColor}
                  click={() => drawCardForCurrentPlayer(cardColor, i)}
                  highlighted={false}
                />
              );
            })}
            <div className="flex flex-row">
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack
                  type="trains"
                  drawCard={() => drawCardFromDeck(getRandomColor())}
                  highlighted={false}
                />
              </div>
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack type="destinations" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawSidebar;
