import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/store";
import gameMap from "../assets/ticket-to-ride-europe-map.jpg";
import Card from "../components/card";
import CardStack from "../components/card-stack";

import { getRandomColor } from "../utils/getRandomColor";
import { getRandomDestination } from "../utils/getRandomDestination";

const GameScreen = () => {
  const [state, dispatch] = useContext(Context);
  const [cards, setCards] = useState(
    [...Array(5)].map((_) => getRandomColor())
  );
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "IN_GAME" });
    console.log(cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawCard = (deckType) => {
    if (deckType === "trains") {
      setCards([...cards, getRandomColor()]);
    } else if (deckType === "destinations") {
      setDestinations([...destinations, getRandomDestination()]);
      console.log(destinations);
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-blue-700 mx-10 my-4 font-semibold">
        Your Turn !
      </h1>
      <div className="flex flex-col my-12">
        <div className="flex flex-row">
          <img
            src={gameMap}
            alt="Game Map"
            className="self-center w-1/2 mx-10"
          />
          <CardStack drawCard={() => drawCard("trains")} type="trains" />
          <CardStack
            drawCard={() => drawCard("destinations")}
            type="destinations"
          />
        </div>
        <div className="flex flex-col flex-wrap mx-10">
          {destinations.map((dest) => (
            <p>{dest.fromCity + "<->" + dest.toCity}</p>
          ))}
        </div>
        <div className="flex flex-row flex-wrap mx-10">
          {cards.map((color) => (
            <Card color={color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
