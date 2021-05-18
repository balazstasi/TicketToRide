import React, { useState } from "react";
import Card from "../card";
import { useSelector } from "react-redux";
import ScrollBar from "react-perfect-scrollbar";

const DrawBottom = () => {
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
      <ScrollBar style={{ maxHeight: "25vh" }}>
        <div className={`flex flex-row flex-auto antialiased bg-blue-900 text-gray-800 mt-10`}>
          <div className="flex items-center flex-wrap pl-6 h-auto border-b border-gray-800 mr-40">
            {gameState.turnPlayer === 1 &&
              Object.keys(playerOne.cards).map((color) => {
                const amount = playerOne.cards[color];
                const result = Array.from(Array(amount).keys()).map((card, i) => (
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
                const result = Array.from(Array(amount).keys()).map((card, i) => (
                  <Card
                    color={color}
                    highlighted={color === cardHighlighted}
                    onSelect={() => highlightCard(color)}
                  />
                ));

                return result;
              })}
          </div>
        </div>
      </ScrollBar>
    </>
  );
};

export default DrawBottom;
