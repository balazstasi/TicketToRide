import React, { useContext } from "react";

import { Context } from "../store/store";
function Player({ number, name, turnPlayer, renderCards }) {
  const [state] = useContext(Context);
  console.log(number);
  const player = state[number];
  return (
    <div>
      <h1 className="font-semibold text-black text-3xl mx-8 mt-8">
        <span
          className={`text-4xl border-2 bg-blue-900 p-2 ${
            turnPlayer ? "text-white bg-blue-900 border-2 border-white" : "text-blue-500"
          }`}
        >
          {name}
        </span>

        <div className="mb-4 mt-12">
          <p className="text-center text-blue-100">
            Trains: <span className="text-blue-900">{player.trains}</span>
          </p>
          {renderCards &&
            Object.keys(player.cards).map((cardType) => (
              <p>
                {cardType} <span className="text-blue-100">{player.cards[cardType]}</span>
              </p>
            ))}
        </div>
      </h1>
    </div>
  );
}

export default Player;
