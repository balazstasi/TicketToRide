import React, { useEffect, useState } from "react";
import DestinationCard from "../common/destination-card";
import { Button } from "../common/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getThreeShortDestinations } from "../utils/getThreeDestinations";
import { toggleDestinationOne } from "../store/slices/playerOneSlice";
import { toggleDestinationTwo } from "../store/slices/playerTwoSlice";
import { setTurnPlayer } from "../store/slices/gameSlice";
import { getRandomLongDestination } from "../utils/getRandomDestination";

const DestinationCardSelect = () => {
  const d = useDispatch();
  const [destinations, setDestinations] = useState([]);
  const [longDestinationOne, setLongDestinationOne] = useState([]);
  const [longDestinationTwo, setLongDestinationTwo] = useState([]);
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  useEffect(() => {
    d(setTurnPlayer(1));
  }, [d]);

  const toggleDestination = (destination) => {
    gameState.turnPlayer === 1 && d(toggleDestinationOne(destination));
    gameState.turnPlayer === 2 && d(toggleDestinationTwo(destination));
  };

  useEffect(() => {
    setDestinations(getThreeShortDestinations());

    let longDest = getRandomLongDestination();
    setLongDestinationOne(longDest);
    d(toggleDestinationOne(longDest));

    longDest = getRandomLongDestination();
    setLongDestinationTwo(longDest);
    d(toggleDestinationTwo(longDest));
  }, []);

  const isToggled = (destination) => {
    if (gameState.turnPlayer === 1) {
      return playerOne.destinations.find((d) => d?.id === destination.id);
    }
    if (gameState.turnPlayer === 2) {
      return playerTwo.destinations.find((d) => d?.id === destination.id);
    }
    return false;
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-2 font-bold text-3xl text-blue-200 select-none">
        Player {gameState.turnPlayer}
      </h1>
      <h2 className="text-center mt-4 font-bold text-3xl text-blue-200 select-none">
        Please Select <span className="text-4xl">1</span> to <span className="text-4xl">3 </span>
        Cards!
      </h2>
      {gameState.turnPlayer === 1 && (
        <h3 className="text-center mt-2">
          (Your Long Destination is:
          {` ${longDestinationOne.fromCity} ➡️➡️➡️ ${longDestinationOne.toCity}`})
        </h3>
      )}
      {gameState.turnPlayer === 2 && (
        <h3 className="text-center mt-2">
          (Your Long Destination is:
          {` ${longDestinationTwo.fromCity} ➡️➡️➡️ ${longDestinationTwo.toCity}`})
        </h3>
      )}

      {destinations.map((dest) => {
        return (
          <DestinationCard
            destination={dest}
            from={dest.fromCity}
            to={dest.toCity}
            toggled={isToggled(dest)}
            click={() => toggleDestination(dest)}
          />
        );
      })}
      {playerOne.destinations.length > 0 && (
        <div className="w-1/4 mt-4 self-center text-center">
          {gameState.turnPlayer === 1 && (
            <Button
              onClick={() => {
                d(setTurnPlayer(2));
                setDestinations(getThreeShortDestinations());
              }}
            >
              Continue with selected Destinations
            </Button>
          )}
          {playerTwo.destinations.length > 0 && gameState.turnPlayer === 2 && (
            <Link to="/game">
              <div className="text-center">
                <Button>Continue with selected Destinations</Button>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationCardSelect;
