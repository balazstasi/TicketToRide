import React, { useContext, useEffect, useState } from "react";
import Card from "../components/card";
import Player from "../components/player";
import CardStack from "../components/card-stack";
import { Context } from "../store/store";
import { players } from "../constants/players";
import { getRandomColor } from "../utils/getRandomColor";
import { getRandomDestination } from "../utils/getRandomDestination";
import { Link } from "react-router-dom";
import { Button } from "../common/button";
import Map from "../components/map";
import Sidebar from "../components/player-stats/sidebar";
import DrawSidebar from "../components/draw-sidebar/draw-sidebar";
import DrawBottom from "../components/draw-sidebar/draw-bottom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { drawCard, setTurnPlayer } from "../store/slices/gameSlice";
import { resetDeck } from "../store/slices/gameSlice";

const GameScreen = () => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const gameState = useSelector((state) => state.game);

  // const [state, dispatch] = useContext(Context);
  const [cards, setCards] = useState([...Array(5)].map((_) => getRandomColor()));
  const [ownCards, setOwnCards] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [scoreTable, setScoreTable] = useState(false);

  // useEffect(() => {
  //   dispatch({ type: "SET_GAME_STATE", payload: "IN_GAME" });
  //   console.log(cards);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const drawCard = (deckType) => {
  //   if (deckType === "trains" && ownCards.length < 5) {
  //     const color = getRandomColor();
  //     setOwnCards([...ownCards, color]);
  //     dispatch({
  //       type: "ADD_CARD_TO_PLAYER",
  //       payload: { color, amount: 1 },
  //     });
  //   } else if (deckType === "destinations" && destinations.length < 3) {
  //     setDestinations([...destinations, getRandomDestination()]);
  //     console.log(destinations);
  //   }
  // };

  // const getCard = (i) => {
  //   if (ownCards.length < 5) {
  //     const neededColor = cards.find((c, idx) => idx === i);
  //     setOwnCards([...ownCards, neededColor]);
  //     dispatch({
  //       type: "ADD_CARD_TO_PLAYER",
  //       payload: { color: neededColor, amount: 1 },
  //     });

  //     const newCards = cards.filter((c, idx) => idx !== i);
  //     setCards(newCards);
  //     setCards([...newCards, getRandomColor()]);
  //   }
  // };

  useEffect(() => {});

  return (
    <div className="h-screen">
      <div className="absolute">
        <Sidebar />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-full">
          <div className="flex flex-row self-center">
            <div>
              <Button onClick={() => d(drawCard())}>Draw New Card</Button>
            </div>
            <div>
              <Button onClick={() => d(resetDeck())}>Reset Draw Deck</Button>
            </div>
            <div>
              <Button highlighted={gameState.turnPlayer === 1} onClick={() => d(setTurnPlayer(1))}>
                Player 1
              </Button>
            </div>
            <div>
              <Button highlighted={gameState.turnPlayer === 2} onClick={() => d(setTurnPlayer(2))}>
                Player 2
              </Button>
            </div>
            {/* <div>
              <Link to="/">
                <Button>Back to Title</Button>
              </Link>
            </div>
            <div>
              <Link to="/end-game">
                <Button>End Game</Button>
              </Link>
            </div> */}
          </div>

          <Map destinations={destinations} />
          <DrawBottom />
        </div>
        <DrawSidebar />
        {/* <CardStack drawCard={() => drawCard("trains")} type="trains" />
      <CardStack drawCard={() => drawCard("destinations")} type="destinations" /> */}
      </div>
    </div>
  );
};

export default GameScreen;
