import React, { useState } from "react";
import Card from "../card";
import { useDispatch, useSelector } from "react-redux";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { toggleCardOne } from "../../store/slices/playerOneSlice";
import { toggleCardTwo } from "../../store/slices/playerTwoSlice";
import { syncAction } from "../..";

const DrawBottom = ({ isOpened }) => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);
  const local = useSelector((state) => state.ui);

  return (
    <>
      <div
        className={`${
          isOpened && "hidden"
        } flex flex-row flex-auto antialiased bg-blue-900 text-gray-800 h-90`}
      >
        <ScrollBar style={{ maxHeight: "26vh" }}>
          <div className="flex items-center flex-wrap pl-6 h-auto p-4 mr-44 ml-4">
            {local.actualPlayer === 1 &&
              playerOne.hand.map((color, index) => (
                <Card
                  color={color}
                  highlighted={playerOne.selectedCards.find((card) => card.index === index)}
                  onSelect={() => {
                    d(toggleCardOne({ color, index }));
                    syncAction(toggleCardOne({ color, index }), gameState.gameCode, true);
                  }}
                />
              ))}
            {local.actualPlayer === 2 &&
              playerTwo.hand.map((color, index) => (
                <Card
                  color={color}
                  highlighted={playerTwo.selectedCards.find((card) => card.index === index)}
                  onSelect={() => {
                    d(toggleCardTwo({ color, index }));
                    syncAction(toggleCardTwo({ color, index }), gameState.gameCode, true);
                  }}
                />
              ))}
          </div>
        </ScrollBar>
      </div>
    </>
  );
};

export default DrawBottom;
