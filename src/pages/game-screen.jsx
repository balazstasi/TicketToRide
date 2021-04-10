import React, { useContext, useEffect, useState } from "react";
import Card from "../components/card";
import Player from "../components/player";
import CardStack from "../components/card-stack";
import { Context } from "../store/store";
import { players } from "../constants/players";
import { getRandomColor } from "../utils/getRandomColor";
import { getRandomDestination } from "../utils/getRandomDestination";
import Map from "../components/map";

const GameScreen = () => {
  const [state, dispatch] = useContext(Context);
  const [cards, setCards] = useState(
    [...Array(5)].map((_) => getRandomColor())
  );
  const [ownCards, setOwnCards] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [scoreTable, setScoreTable] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "IN_GAME" });
    console.log(cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawCard = (deckType) => {
    if (deckType === "trains" && ownCards.length < 5) {
      const color = getRandomColor();
      setOwnCards([...ownCards, color]);
      dispatch({
        type: "ADD_CARD_TO_PLAYER",
        payload: { color, amount: 1 },
      });
    } else if (deckType === "destinations") {
      setDestinations([...destinations, getRandomDestination()]);
      console.log(destinations);
    }
  };

  const getCard = (i) => {
    if (ownCards.length < 5) {
      const neededColor = cards.find((c, idx) => idx === i);
      setOwnCards([...ownCards, neededColor]);
      dispatch({
        type: "ADD_CARD_TO_PLAYER",
        payload: { color: neededColor, amount: 1 },
      });

      const newCards = cards.filter((c, idx) => idx !== i);
      setCards(newCards);
      setCards([...newCards, getRandomColor()]);
    }
  };

  const toggleScoreTable = () => {
    setScoreTable(!scoreTable);
  };

  useEffect(() => {
    // console.log("OWN", ownCards);
    // console.log("CARDS", cards);
  }, [ownCards, cards]);

  return (
    <div>
      {/* <h1 className="text-5xl text-blue-700 mx-10 my-4 font-semibold">
        Your Turn !
      </h1> */}
      {/* //TODO: kulon komponensbe  */}
      <button
        className="bg-blue-700 text-white font-semibold p-4 my-4 mx-12 rounded-md"
        onClick={() => toggleScoreTable()}
      >
        {scoreTable ? "Hide Scores" : "Show Scores"}
      </button>
      {scoreTable && (
        <div className="flex flex-row px-2 mx-2 flex-wrap w-1/2 p-4">
          {players.map((name, i) => (
            <Player
              number={i + 1}
              name={name}
              turnPlayer={name === state.turnPlayer}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {/* <div className="flex flex-row"></div> */}
        <div className="flex flex-row">
          <Map />

          <div className="flex flex-col flex-wrap">
            {cards.map((color, i) => (
              <Card color={color} click={() => getCard(i)} />
            ))}
          </div>
          <div className="flex flex-col flex-1">
            <CardStack drawCard={() => drawCard("trains")} type="trains" />
            <CardStack
              drawCard={() => drawCard("destinations")}
              type="destinations"
            />
          </div>
        </div>
        <div className="flex flex-col flex-wrap mx-10">
          {destinations.map((dest) => (
            <p>{dest.fromCity + "<->" + dest.toCity}</p>
          ))}
        </div>
        <div className="flex flex-row flex-wrap">
          {ownCards.map((color, i) => (
            <Card color={color} click={() => getCard(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
