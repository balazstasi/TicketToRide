/* eslint-disable import/no-anonymous-default-export */
import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "./config";
import { useDispatch, useSelector } from "react-redux";
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

  // if (!socket) {
  socket = io.connect(WS_BASE);

  socket.on("player-joined", (ack) => {
    console.log("player-joined", ack);
  });

  socket.on("room-is-full", (data) => {
    console.log("room-is-full", data);
  });

  socket.on("player-left", (data) => {
    console.log("payer-left", data);
  });

  socket.on("action-sent", ({ roomId, action }) => {
    console.log("action-sent", action);
    dispatch(action);
  });

  ws = {
    socket: socket,
  };
  // }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
