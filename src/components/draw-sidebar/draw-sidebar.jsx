import React from "react";
import { getRandomColor } from "../../utils/getRandomColor";
import Card from "../card";
import CardStack from "../card-stack";
import { removeCard } from "../../store/slices/gameSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCardOne } from "../../store/slices/playerOneSlice";
import { addCardTwo } from "../../store/slices/playerTwoSlice";

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
    } else if (gameState.turnPlayer === 2 && playerTwo.cardsDrawn < 5) {
      d(addCardTwo(cardColor));
      d(removeCard(i));
    }

    console.log(playerTwo);
  };

  return (
    <>
      <div
        className={`min-h-screen h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 text-gray-800`}
      >
        <div className="fixed flex flex-col top-0 right-0 w-64 bg-blue-900 h-full">
          <div className="flex items-center pl-6 h-20 border-b border-gray-800">
            <div className="ml-1">
              <p className="ml-1 mt-4 text-3xl font-medium tracking-wide truncate text-blue-100 font-sans">
                Draw Cards
              </p>
              {/* <div className="badge my-2">
                <div className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-900 bg-blue-100 rounded-full"></div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between mt-1 flex-grow">
            {gameState?.deck.map((cardColor, i) => {
              return (
                <Card color={cardColor} click={() => drawCardForCurrentPlayer(cardColor, i)} />
              );
            })}
            <div className="flex flex-row">
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack type="trains" />
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
