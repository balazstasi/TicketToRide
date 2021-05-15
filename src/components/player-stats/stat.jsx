import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { coord } from "../../utils/calculateCoordinate";
import { getDestinationByName } from "../../utils/getDestinationByName";
import { highlightCity } from "../../store/slices/uiSlice";

const Stat = ({ player }) => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const ui = useSelector((state) => state.ui);

  const highlightNodes = (destination) => {
    const firstCity = getDestinationByName(destination.fromCity);
    console.log(firstCity);
    const secondCity = getDestinationByName(destination.toCity);

    const fst = coord(firstCity.x, firstCity.y);
    const xFirst = fst.x;
    const yFirst = fst.y;

    const snd = coord(secondCity.x, secondCity.y);
    const xSecond = snd.x;
    const ySecond = snd.y;

    d(highlightCity({ xFirst, xSecond, yFirst, ySecond }));
  };

  return (
    <div className="mb-4 bg-gradient-to-tl from-blue-800 to-blue-600 p-2">
      <h1 className="text-xl font-semibold">
        P{player}|{player === 1 ? playerOne.name : playerTwo.name}
      </h1>
      {/* <ul>
        {player === 1
          ? Object.keys(playerOne.cards).map((card) => {
              const amount = playerOne.cards[card];
              return amount > 0 && <li>{card + ": " + playerOne.cards[card]}</li>;
            })
          : Object.keys(playerTwo.cards).map((card) => {
              const amount = playerTwo.cards[card];
              return amount > 0 && <li>{card + ": " + playerTwo.cards[card]}</li>;
            })}
      </ul> */}
      <p>Score: {player === 1 ? playerOne.score : playerTwo.score}</p>
      <p>Markers: {player === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p>Train Cards: {player === 1 ? "TODO" : "TODO"}</p>
      <p>
        Destination Cards:{" "}
        {player === 1 ? playerOne.destinations.length : playerTwo.destinations.length}
      </p>
      <div className="text-xl font-bold text-blue-100">
        {player === 1
          ? playerOne.destinations.map((destination) => (
              <div
                className="cursor-pointer"
                onMouseEnter={() => highlightNodes(destination)}
              >{`${destination.fromCity} -> ${destination.toCity}`}</div>
            ))
          : playerTwo.destinations.map((destination) => (
              <div
                className="cursor-pointer"
                onMouseEnter={() => highlightNodes(destination)}
              >{`${destination.fromCity} -> ${destination.toCity}`}</div>
            ))}
      </div>
    </div>
  );
};

export default Stat;
