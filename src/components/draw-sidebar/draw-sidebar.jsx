import React from "react";
import Card from "../card";
import CardStack from "../card-stack";
import { getRandomColor } from "../../utils/getRandomColor";
import { removeCard } from "../../store/slices/gameSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCardOne } from "../../store/slices/playerOneSlice";
import { addCardTwo } from "../../store/slices/playerTwoSlice";
import { onlyOneLocomotive } from "../../utils/onlyOneLocomotive";
import { LOCOMOTIVE } from "../../constants/constants";
import { setTurnPlayer } from "../../store/slices/gameSlice";

const DrawSidebar = () => {
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const drawCardForCurrentPlayer = (cardColor, i) => {
    console.log("ADD CARD", { color: cardColor });

    if (gameState.turnPlayer === 1 && playerOne.cardsDrawn < 5) {
      d(addCardOne(cardColor));
      d(removeCard(i));
      d(setTurnPlayer(gameState.turnPlayer === 1 ? 2 : 1));
    } else if (gameState.turnPlayer === 2 && playerTwo.cardsDrawn < 5) {
      d(addCardTwo(cardColor));
      d(removeCard(i));
      d(setTurnPlayer(gameState.turnPlayer === 1 ? 2 : 1));
    }
  };

  const drawCardFromDeck = (cardColor) => {
    if (gameState.turnPlayer === 1 && playerOne.cardsDrawn < 5) {
      d(addCardOne(cardColor));
    } else if (gameState.turnPlayer === 2 && playerTwo.cardsDrawn < 5) {
      d(addCardTwo(cardColor));
    }
  };

  return (
    <>
      <div
        className={`z-0 min-h-screen h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 text-gray-800`}
      >
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
