/* eslint-disable import/no-anonymous-default-export */
import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setGameCode } from "../store/slices/gameSlice";
import { setStateOne } from "../store/slices/playerOneSlice";
import { setStateTwo } from "../store/slices/playerTwoSlice";
import { setStateGame } from "../store/slices/gameSlice";

const WebSocketContext = createContext(null);
const WebSocketContextConsumer = WebSocketContext.Consumer;

export { WebSocketContext, WebSocketContextConsumer };

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const createRoom = (code) => {
    socket.emit("create-room", 2, ({ status, roomId }) => {
      dispatch(setGameCode({ id: roomId, code }));
    });
  };

  const closeRoom = () => {
    socket.emit("close-room", JSON.stringify(game.gameCode.id), (ack) => console.log("CLOSE", ack));
  };

  const syncState = () => {
    socket.emit("sync-state", game.gameCode, { 1: playerOne, 2: playerTwo, game }, false, (ack) => {
      console.log("SYNC", ack);
    });
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on("state-changed", ({ _, state }) => {
      const payload = JSON.parse(state);
      console.log(payload);
      dispatch(setStateOne(payload[1]));
      dispatch(setStateTwo(payload[2]));
      dispatch(setStateGame(payload.game));
    });

    socket.on("room-is-full", ({ roomId, state, player }) => {
      const payload = JSON.parse(state);
      console.log(payload);
    });

    ws = {
      socket: socket,
      createRoom,
      closeRoom,
      syncState,
    };
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
