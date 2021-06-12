import React, { useEffect } from "react";
import Routes from "./routes/Routes";
import { socket, syncAction } from "./index";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";
import { setLastMoveOne, setStateOne } from "./store/slices/playerOneSlice";
import { setLastMoveTwo, setStateTwo } from "./store/slices/playerTwoSlice";
import { setDeck, setStateGame } from "./store/slices/gameSlice";
import { useHistory } from "react-router-dom";
import store from "./store/index";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const local = useSelector((state) => state.ui);

  useEffect(() => {
    socket.on("action-sent", (ack) => {
      console.log("action-sent", ack.action);
      if (ack.action) dispatch(ack.action);
      local.actualPlayer === 1 &&
        syncAction(setLastMoveOne(playerOne.lastMove), game.gameCode, true);
      local.actualPlayer === 2 &&
        syncAction(setLastMoveTwo(playerTwo.lastMove), game.gameCode, true);
    });
  }, []);

  useEffect(() => {
    if (game.gameEnded) history.push("/end-game");
  }, [game.gameEnded]);

  // socket.on("state-changed", function (answer) {
  //   console.log("state-changed", answer);
  // });

  // socket.on("action-sent", ({ roomId, action }) => {
  //   console.log("action-sent", action, roomId);
  //   dispatch(action);
  // });

  // socket.on("room-is-full", () => {
  //   console.log("room-is-full");
  //   // history.push("/game");
  // });

  // socket.on("player-joined", () => {
  //   console.log("player-joined");
  // });

  return <Routes />;
}

export default App;
