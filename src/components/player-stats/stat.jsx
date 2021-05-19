import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { coord } from "../../utils/calculateCoordinate";
import { getDestinationByName } from "../../utils/getDestinationByName";
import { highlightCity } from "../../store/slices/uiSlice";

const Stat = ({ player, highlighted }) => {
  const d = useDispatch();
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

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
    <div className="mb-4 bg-gradient-to-tl from-blue-800 to-blue-600 p-5">
      <h1
        className={`${
          highlighted && "bg-white text-blue-800"
        } mx-1 px-2 py-1 mb-2 text-md font-semibold`}
      >
        P{player}|{player === 1 ? playerOne.name : playerTwo.name}
      </h1>
      <p>
        Last 2 Moves:
        <div className="text-xs">
          {player === 1 && playerOne.lastMove ? (
            <div>
              <p>{playerOne?.beforeLastMove || "NO MOVE"}</p>
              <p>{playerOne?.lastMove || "NO MOVE"}</p>
            </div>
          ) : (
            playerTwo.lastMove && (
              <div>
                <p>{playerTwo?.beforeLastMove || "NO MOVE"}</p>
                <p>{playerTwo?.lastMove || "NO MOVE"}</p>
              </div>
            )
          )}
        </div>
      </p>
      <p className="text-sm">Score: {player === 1 ? playerOne.score : playerTwo.score}</p>
      <p className="text-sm">Markers: {player === 1 ? playerOne.trains : playerTwo.trains}</p>
      <p className="text-sm">
        Train Cards: {player === 1 ? playerOne.cardsDrawn : playerTwo.cardsDrawn}
      </p>
      <p className="text-sm">Destination Cards: </p>
      <div className="text-sm font-bold text-blue-100">
        {player === 1
          ? playerOne.destinations.map((destination) => (
              <div
                className="cursor-pointer"
                onMouseEnter={() => highlightNodes(destination)}
              >{`${destination.value}: ${destination.fromCity} -> ${destination.toCity}`}</div>
            ))
          : playerTwo.destinations.map((destination) => (
              <div
                className="cursor-pointer"
                onMouseEnter={() => highlightNodes(destination)}
              >{`${destination.value}: ${destination.fromCity} -> ${destination.toCity}`}</div>
            ))}
      </div>
    </div>
  );
};

export default Stat;
