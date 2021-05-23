import React, { useEffect, useState } from "react";
import Card from "../card";
import CardStack from "../card-stack";
import { getRandomColor } from "../../utils/getRandomColor";
import { removeCard, setGamePhase, setTurnPlayer } from "../../store/slices/gameSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCardOne, setCardsDrawnThisTurnOne } from "../../store/slices/playerOneSlice";
import { addCardTwo, setCardsDrawnThisTurnTwo } from "../../store/slices/playerTwoSlice";
import { GAME_PHASE } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const DrawSidebar = () => {
  const history = useHistory();
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const [drawnOne, setDrawnOne] = useState(0);
  const [drawnTwo, setDrawnTwo] = useState(0);

  useEffect(() => {
    setCardsDrawnThisTurnOne(0);
    setCardsDrawnThisTurnTwo(0);
  }, []);

  const drawCardForCurrentPlayer = (cardColor, i) => {
    if (gameState.turnPlayer === 1) {
      d(addCardOne(cardColor));
      d(removeCard(i));
      setDrawnOne(drawnOne + 1);
      if (drawnOne === 1) {
        d(setTurnPlayer(2));
        d(setCardsDrawnThisTurnOne(0));
        setDrawnOne(0);
      }
    } else if (gameState.turnPlayer === 2) {
      d(addCardTwo(cardColor));
      d(removeCard(i));
      setDrawnTwo(drawnTwo + 1);
      if (drawnTwo === 1) {
        d(setTurnPlayer(1));
        d(setCardsDrawnThisTurnTwo(0));
        setDrawnTwo(0);
      }
    }
  };

  const drawCardFromDeck = (cardColor) => {
    if (gameState.turnPlayer === 1) {
      d(addCardOne(cardColor));
      if (playerOne.cardsDrawnThisTurn === 1) {
        d(setCardsDrawnThisTurnOne(0));
        d(setTurnPlayer(2));
      }
    } else if (gameState.turnPlayer === 2) {
      console.log(playerTwo.cardsDrawnThisTurn);
      d(addCardTwo(cardColor));
      if (playerTwo.cardsDrawnThisTurn === 2) {
        d(setCardsDrawnThisTurnTwo(0));
        d(setTurnPlayer(1));
      }
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
                <CardStack
                  drawCard={() => {
                    d(
                      setGamePhase(
                        gameState.turnPlayer === 1
                          ? GAME_PHASE.CHOOSE_DESTINATIONS_1
                          : GAME_PHASE.CHOOSE_DESTINATIONS_2
                      )
                    );
                    history.push("/destination-card-select");
                  }}
                  type="destinations"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawSidebar;
