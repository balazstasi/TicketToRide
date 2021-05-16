import React, { useEffect, useState } from "react";
import DestinationCard from "../common/destination-card";
import { Button } from "../common/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getThreeDestinations } from "../utils/getThreeDestinations";
import { toggleDestinationOne } from "../store/slices/playerOneSlice";
import { toggleDestinationTwo } from "../store/slices/playerTwoSlice";
import { setTurnPlayer } from "../store/slices/gameSlice";

const DestinationCardSelect = () => {
  const [destinations, setDestinations] = useState([]);
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const stateOne = useSelector((state) => state.playerOne);
  const stateTwo = useSelector((state) => state.playerTwo);

  useEffect(() => {
    d(setTurnPlayer(1));
  }, [d]);

  // Get 3 random destinations to choose from
  useEffect(() => {
    setDestinations(getThreeDestinations());
  }, []);

  // Toggle Destination for current player
  const toggleDestination = (destination) => {
    if (gameState.turnPlayer === 1) d(toggleDestinationOne(destination));
    if (gameState.turnPlayer === 2) d(toggleDestinationTwo(destination));
  };

  const isToggled = (destination) => {
    if (gameState.turnPlayer === 1) {
      console.log(
        stateOne.destinations.find((d) => d.id === destination.id) ? "FOUND1" : "NOTFOUND1"
      );
      return stateOne.destinations.find((d) => d.id === destination.id);
    }
    if (gameState.turnPlayer === 2) {
      console.log(stateTwo.destinations.find((d) => d.id === destination.id) && "FOUND For 2");
      return stateTwo.destinations.find((d) => d?.id === destination.id);
    }

    throw new Error("CURRENT TURN PLAYER IS NOT CORRECT");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-2 font-bold text-3xl text-blue-200 select-none">
        Player {gameState.turnPlayer}
      </h1>
      <h2 className="text-center mt-4 font-bold text-3xl text-blue-200 select-none">
        Please Select <span className="text-4xl">2</span> Destination Cards!
      </h2>

      {destinations.map((dest) => {
        return (
          <DestinationCard
            destination={dest}
            toggled={isToggled(dest)}
            from={dest.fromCity}
            to={dest.toCity}
            click={() => toggleDestination(dest)}
          />
        );
      })}

      <div className="w-1/4 mt-4 self-center text-center">
        {gameState.turnPlayer === 1 ? (
          <Button
            onClick={() => {
              d(setTurnPlayer(2));
              setDestinations(getThreeDestinations());
            }}
          >
            Confirm Choices
          </Button>
        ) : (
          <Link to="/game">
            <div className="text-center">
              <Button>Confirm Choices</Button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DestinationCardSelect;
