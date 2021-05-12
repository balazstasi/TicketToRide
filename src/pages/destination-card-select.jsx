import React, { useContext, useEffect, useState } from "react";
import DestinationCard from "../common/destination-card";
import { Context } from "../store/store";
import { Button } from "../common/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getThreeDestinations } from "../utils/getThreeDestinations";
import { toggleDestinationOne } from "../store/slices/playerOneSlice";
import { toggleDestinationTwo } from "../store/slices/playerTwoSlice";
import { setTurnPlayer } from "../store/slices/gameSlice";

const DestinationCardSelect = () => {
  const [state, dispatch] = useContext(Context);

  const [destinations, setDestinations] = useState([]);
  const d = useDispatch();
  const gameState = useSelector((state) => state.game);
  const stateOne = useSelector((state) => state.playerOne);
  const stateTwo = useSelector((state) => state.playerTwo);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "DESTINATION_CARD_SELECT" });
    d(setTurnPlayer(1));
  }, [d, dispatch]);

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
      return stateTwo.destinations.find((d) => d.id === destination.id);
    }

    throw new Error("CURRENT TURN PLAYER IS NOT CORRECT");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-10 font-bold text-3xl text-blue-200 select-none">
        Plyer {gameState.turnPlayer}
      </h1>
      <h2 className="text-center mt-10 font-bold text-3xl text-blue-200 select-none">
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

      <div className="w-full text-center">
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
            <Button>Confirm Choices</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DestinationCardSelect;
