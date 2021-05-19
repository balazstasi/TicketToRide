import React, { useState } from "react";
import Card from "../card";
import { useSelector } from "react-redux";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const DrawBottom = ({ isOpened }) => {
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);

  const [cardHighlighted, setCardHighlighted] = useState();

  const highlightCard = (color) => {
    console.log("HIGHLIGHTING:", color);
    if (cardHighlighted === color) setCardHighlighted(null);
    else setCardHighlighted(color);
  };

  return (
    <>
      <div
        className={`${
          isOpened && "hidden"
        } flex flex-row flex-auto antialiased bg-blue-900 text-gray-800 h-90`}
      >
        <ScrollBar style={{ maxHeight: "26vh" }}>
          <div className="flex items-center flex-wrap pl-6 h-auto p-4 mr-32">
            {gameState.turnPlayer === 1 &&
              Object.keys(playerOne.cards).map((color) => {
                const amount = playerOne.cards[color];
                const result = Array.from(Array(amount).keys()).map(() => (
                  <Card
                    color={color}
                    highlighted={color === cardHighlighted}
                    onSelect={() => highlightCard(color)}
                  />
                ));

                return result;
              })}
            {gameState.turnPlayer === 2 &&
              Object.keys(playerTwo.cards).map((color) => {
                const amount = playerTwo.cards[color];
                const result = Array.from(Array(amount).keys()).map(() => (
                  <Card
                    color={color}
                    highlighted={color === cardHighlighted}
                    onSelect={() => highlightCard(color)}
                  />
                ));

                return result;
              })}
          </div>
        </ScrollBar>
      </div>
    </>
  );
};

export default DrawBottom;
