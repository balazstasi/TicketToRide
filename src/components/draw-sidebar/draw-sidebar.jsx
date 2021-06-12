import React, { useEffect, useState } from "react";
import Card from "../card";
import CardStack from "../card-stack";
import { getRandomColor } from "../../utils/getRandomColor";
import { removeCard, setDeck, setGamePhase, setTurnPlayer } from "../../store/slices/gameSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addCardOne,
  setCardsDrawnThisTurnOne,
  setLastMoveOne,
} from "../../store/slices/playerOneSlice";
import {
  addCardTwo,
  setCardsDrawnThisTurnTwo,
  setLastMoveTwo,
} from "../../store/slices/playerTwoSlice";
import { GAME_PHASE } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import { syncAction } from "../../index";

const DrawSidebar = () => {
  const history = useHistory();
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const local = useSelector((state) => state.ui);

  const [drawnOne, setDrawnOne] = useState(0);
  const [drawnTwo, setDrawnTwo] = useState(0);

  useEffect(() => {
    syncAction(setCardsDrawnThisTurnOne(0), gameState.gameCode, false);
    syncAction(setCardsDrawnThisTurnTwo(0), gameState.gameCode, false);
  }, []);

  const drawCardForCurrentPlayer = (cardColor, i) => {
    if (gameState.turnPlayer === 1 && local.actualPlayer === 1) {
      d(addCardOne(cardColor));
      syncAction(addCardOne(cardColor), gameState.gameCode, true);
      d(removeCard(i));
      setDrawnOne(drawnOne + 1);
      // syncAction(setDrawnOne(drawnOne + 1), gameState.gameCode, true);
      if (drawnOne === 1) {
        d(setTurnPlayer(2));
        syncAction(setTurnPlayer(2), gameState.gameCode, false);

        syncAction(setCardsDrawnThisTurnTwo(0), gameState.gameCode, false);
        // syncAction(setLastMoveOne(playerOne.lastMove), gameState.gameCode, false);
        setDrawnOne(0);
        syncAction(setDrawnOne(0), gameState.gameCode, false);
      }
    } else if (gameState.turnPlayer === 2 && local.actualPlayer === 2) {
      d(addCardTwo(cardColor));
      syncAction(addCardTwo(cardColor), gameState.gameCode, true);

      d(removeCard(i));
      // syncAction(setLastMoveOne(playerOne.lastMove), gameState.gameCode, false);

      setDrawnTwo(drawnTwo + 1);
      // syncAction(setDrawnTwo(drawnTwo + 1), gameState.gameCode, true);

      if (drawnTwo === 1) {
        d(setTurnPlayer(1));
        syncAction(setTurnPlayer(1), gameState.gameCode, false);
        syncAction(setCardsDrawnThisTurnOne(0), gameState.gameCode, false);
        setDrawnTwo(0);
        syncAction(setDrawnTwo(0), gameState.gameCode, true);
      }
    }
  };

  const drawCardFromDeck = (cardColor) => {
    if (gameState.turnPlayer === 1) {
      d(addCardOne(cardColor));
      syncAction(addCardOne(cardColor), gameState.gameCode, true);

      if (playerOne.cardsDrawnThisTurn === 1) {
        syncAction(setCardsDrawnThisTurnOne(0), gameState.gameCode, false);
        // setLastMoveOne(playerOne.lastMove, gameState.gameCode, false);
        d(setTurnPlayer(2));
        syncAction(setTurnPlayer(2), gameState.gameCode, false);
      }
    } else if (gameState.turnPlayer === 2) {
      syncAction(addCardTwo(cardColor), gameState.gameCode, false);

      if (playerTwo.cardsDrawnThisTurn === 2) {
        syncAction(setCardsDrawnThisTurnTwo(0), gameState.gameCode, false);
        // setLastMoveTwo(playerTwo.lastMove, gameState.gameCode, false);
        d(setTurnPlayer(1));
        syncAction(setTurnPlayer(1), gameState.gameCode, false);
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
                  highlighted={true}
                />
              );
            })}
            <div className="flex flex-row">
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack
                  type="trains"
                  drawCard={() => drawCardFromDeck(getRandomColor())}
                  highlighted={true}
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
