import React from "react";
import { useSelector } from "react-redux";

const Stat = ({ player }) => {
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  return (
    <div className="mb-4 bg-gradient-to-tl from-blue-800 to-blue-600 p-2">
      <h1 className="text-xl font-semibold">
        P{player}|{player === 1 ? playerOne.name : playerTwo.name}
      </h1>
      <ul>
        {player === 1
          ? Object.keys(playerOne.cards).map((card) => {
              const amount = playerOne.cards[card];
              return amount > 0 && <li>{card + ": " + playerOne.cards[card]}</li>;
            })
          : Object.keys(playerTwo.cards).map((card) => {
              const amount = playerTwo.cards[card];
              return amount > 0 && <li>{card + ": " + playerTwo.cards[card]}</li>;
            })}
      </ul>
      <p>Score: {player === 1 ? playerOne.score : playerTwo.score}</p>
      <p>Markers: {player === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p>Train Cards: {player === 1 ? "TODO" : "TODO"}</p>
      <p>
        Destination Cards:{" "}
        {player === 1 ? playerOne.destinations.length : playerTwo.destinations.length}
      </p>
    </div>
  );
};

export default Stat;
