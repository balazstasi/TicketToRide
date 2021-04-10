import React, { useContext } from "react";
import { trainColors } from "../constants/trainColors";

import { Context } from "../store/store";
function Player({ number, name, turnPlayer }) {
  const [state] = useContext(Context);
  console.log(number);
  const player = state[number];
  return (
    <div>
      <h1 className="font-semibold text-black text-3xl mx-8">
        <span
          className={`text-4xl ${
            turnPlayer
              ? "text-white bg-blue-900 border-2 border-white p-1"
              : "text-blue-900"
          }`}
        >
          {name}
        </span>

        <div className="my-4">
          <p>Trains: {player.trains}</p>
          {Object.keys(player.cards).map((cardType) => (
            <p>{cardType + ": " + player.cards[cardType]}</p>
          ))}
        </div>
      </h1>
    </div>
  );
}

export default Player;
