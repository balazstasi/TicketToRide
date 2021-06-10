import React, { useEffect, useState, useContext } from "react";
import DestinationCard from "../common/destination-card";
import { Button } from "../common/button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getThreeShortDestinations } from "../utils/getThreeDestinations";
import { setStateOne, toggleDestinationOne } from "../store/slices/playerOneSlice";
import { setStateTwo, toggleDestinationTwo } from "../store/slices/playerTwoSlice";
import { setStateGame, setTurnPlayer } from "../store/slices/gameSlice";
import { getRandomLongDestination } from "../utils/getRandomDestination";
import { GAME_PHASE } from "../constants/constants";
import useDeepCompareEffect from "use-deep-compare-effect";
import { WebSocketContext } from "../containers/socket-container";
import { syncState } from "../store/thunk/actions";
import { socket } from "../index";
import { syncAction } from "../index";

const DestinationCardSelect = () => {
  const history = useHistory();
  const d = useDispatch();
  const [destinations, setDestinations] = useState([]);
  const [longDestinationOne, setLongDestinationOne] = useState([]);
  const [longDestinationTwo, setLongDestinationTwo] = useState([]);
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const local = useSelector((state) => state.ui);

  // useEffect(() => {
  //   socket.on("action-sent", (ack) => {
  //     console.log("action-sent", ack.action);
  //     d(ack.action);
  //   });
  // }, []);

  useEffect(() => {
    setDestinations(getThreeShortDestinations());
    if (local.actualPlayer === 1) {
      let longDest = getRandomLongDestination();
      setLongDestinationOne(longDest);
      // d(toggleDestinationOne(longDest));
      syncAction(toggleDestinationOne(longDest), gameState.gameCode, false);
    }
    if (local.actualPlayer === 2) {
      let longDest = getRandomLongDestination();
      setLongDestinationTwo(longDest);
      // d(toggleDestinationTwo(longDest));
      syncAction(toggleDestinationTwo(longDest), gameState.gameCode, false);
    }
  }, []);

  const toggleDestination = (destination) => {
    if (local.actualPlayer === 1) {
      d(toggleDestinationOne(destination));
      syncAction(toggleDestinationOne(destination), gameState.gameCode, true);
    }
    if (local.actualPlayer === 2) {
      d(toggleDestinationTwo(destination));
      syncAction(toggleDestinationTwo(destination), gameState.gameCode, true);
    }
  };

  const isToggled = (destination) => {
    if (local.actualPlayer === 1) {
      return playerOne.destinations.find((d) => d?.id === destination.id);
    }
    if (local.actualPlayer === 2) {
      return playerTwo.destinations.find((d) => d?.id === destination.id);
    }
    return false;
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-2 font-bold text-3xl text-blue-200 select-none">
        Player {local.actualPlayer}
      </h1>
      <h2 className="text-center mt-4 font-bold text-3xl text-blue-200 select-none">
        Please Select <span className="text-4xl">1</span> to <span className="text-4xl">3 </span>
        Cards!
      </h2>
      {local.actualPlayer === 1 && (
        <h3 className="text-center mt-2">
          (Your Long Destination is:
          {` ${longDestinationOne.fromCity} ➡️➡️➡️ ${longDestinationOne.toCity}`})
        </h3>
      )}
      {local.actualPlayer === 2 && (
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
          {local.actualPlayer === 1 && (
            <Button
              onClick={() => {
                // if (gameState.gamePhase === GAME_PHASE.CHOOSE_DESTINATIONS_1) {
                //   d(setTurnPlayer(2));
                //   syncAction(setTurnPlayer(2), gameState.gameCode, false);
                //   history.push("/game");
                // } else {
                //   d(setTurnPlayer(2));
                //   syncAction(setTurnPlayer(2), gameState.gameCode, false);
                //   setDestinations(getThreeShortDestinations());
                // }
                // syncAction(setTurnPlayer(2), gameState.gameCode, false);
                history.push("/game");
              }}
            >
              Continue with selected Destinations
            </Button>
          )}
          {local.actualPlayer === 2 && (
            // <Link to="/game">
            //   <div className="text-center">
            //     <Button>Continue with selected Destinations</Button>
            //   </div>
            // </Link>
            <Button
              onClick={() => {
                // if (gameState.gamePhase === GAME_PHASE.CHOOSE_DESTINATIONS_2) {
                //   history.push("/game");
                // } else {
                //   // d(setTurnPlayer(1));
                //   d(setTurnPlayer(1));
                //   setDestinations(getThreeShortDestinations());
                //   history.push("/game");
                // }
                history.push("/game");
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
