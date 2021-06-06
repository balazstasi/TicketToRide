import React, { useEffect, useState, useContext } from "react";
import DestinationCard from "../common/destination-card";
import { Button } from "../common/button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getThreeShortDestinations } from "../utils/getThreeDestinations";
import { toggleDestinationOne } from "../store/slices/playerOneSlice";
import { toggleDestinationTwo } from "../store/slices/playerTwoSlice";
import { setTurnPlayer } from "../store/slices/gameSlice";
import { getRandomLongDestination } from "../utils/getRandomDestination";
import { GAME_PHASE } from "../constants/constants";
import useDeepCompareEffect from "use-deep-compare-effect";
import { WebSocketContext } from "../containers/socket-container";
import { syncState } from "../store/thunk/actions";

const DestinationCardSelect = () => {
  const history = useHistory();
  const d = useDispatch();
  const [destinations, setDestinations] = useState([]);
  const [longDestinationOne, setLongDestinationOne] = useState([]);
  const [longDestinationTwo, setLongDestinationTwo] = useState([]);
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (gameState.gamePhase === "FIRST_DRAW_DESTINATIONS") d(setTurnPlayer(1));
  }, [d]);

  useDeepCompareEffect(() => {
    syncState(gameState.gameCode.id, JSON.stringify(gameState));
  }, [gameState, playerOne, playerTwo]);

  const toggleDestination = (destination) => {
    gameState.turnPlayer === 1 && d(toggleDestinationOne(destination));
    gameState.turnPlayer === 2 && d(toggleDestinationTwo(destination));
  };

  useEffect(() => {
    setDestinations(getThreeShortDestinations());
    if (gameState.gamePhase === "FIRST_DRAW_DESTINATIONS") {
      let longDest = getRandomLongDestination();
      setLongDestinationOne(longDest);
      d(toggleDestinationOne(longDest));

      longDest = getRandomLongDestination();
      setLongDestinationTwo(longDest);
      d(toggleDestinationTwo(longDest));
    }
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
            click={() => {
              toggleDestination(dest);
            }}
          />
        );
      })}
      {playerOne.destinations.length > 0 && (
        <div className="w-1/4 mt-4 self-center text-center">
          {gameState.turnPlayer === 1 && (
            <Button
              onClick={() => {
                if (gameState.gamePhase === GAME_PHASE.CHOOSE_DESTINATIONS_1) {
                  d(setTurnPlayer(2));
                  history.push("/game");
                } else {
                  d(setTurnPlayer(2));
                  setDestinations(getThreeShortDestinations());
                }
              }}
            >
              Continue with selected Destinations
            </Button>
          )}
          {playerTwo.destinations.length > 0 && gameState.turnPlayer === 2 && (
            // <Link to="/game">
            //   <div className="text-center">
            //     <Button>Continue with selected Destinations</Button>
            //   </div>
            // </Link>
            <Button
              onClick={() => {
                if (gameState.gamePhase === GAME_PHASE.CHOOSE_DESTINATIONS_2) {
                  history.push("/game");
                } else {
                  // d(setTurnPlayer(1));
                  d(setTurnPlayer(1));
                  setDestinations(getThreeShortDestinations());
                  history.push("/game");
                }
              }}
            >
              Continue with selected Destinations
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationCardSelect;
