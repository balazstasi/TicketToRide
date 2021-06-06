/* eslint-disable import/no-anonymous-default-export */
import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setGameCode, setPlayerName, setTurnPlayer } from "../store/slices/gameSlice";
import { setNameOne, setStateOne } from "../store/slices/playerOneSlice";
import { setStateTwo, setNameTwo } from "../store/slices/playerTwoSlice";
import { setStateGame } from "../store/slices/gameSlice";
import useDeepCompareEffect from "use-deep-compare-effect";

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

  function emit(name, data, handler) {
    // const ack = async function (resp) {
    //   handler(resp);
    // };
    socket.emit(name, data, handler);
  }

  const createRoom = () => {
    // socket.emit("create-room", 2, ({ status, roomId }) => {
    //   if (status === "ok") {
    //     dispatch(setGameCode({ id: roomId }));
    //     console.log("create-room", roomId);
    //   } else {
    //     console.error("ERROR_CREATING_ROOM");
    //   }
    // });

    emit("create-room", 2, ({ status, roomId }) => {
      if (status === "ok") {
        dispatch(setGameCode({ id: roomId }));
        console.log(game.gameCode.id);
      } else {
        console.error("error creating room");
      }
    });
  };

  const joinRoom = (roomId) => {
    socket.emit("join-room", roomId, ({ status, message }) => {
      if (status === "ok") {
        dispatch(setGameCode({ id: roomId }));
      } else {
        console.error("ERROR_JOINING_ROOM", message);
      }
    });
  };

  const closeRoom = (roomId) => {
    socket.emit("close-room", roomId, (ack) => console.log("close-room", ack));
  };

  const leaveRoom = (roomId) => {
    socket.emit("leave-room", roomId, (ack) => {
      console.log("leave-room", ack);
    });
  };

  const syncState = (roomId) => {
    console.log(roomId);
    socket.emit("sync-state", roomId + "", { 1: playerOne, 2: playerTwo, game }, false, (ack) => {
      if (ack.status === "ok") console.log("sync-state:", { 1: playerOne, 2: playerTwo, game });
      console.log(ack);
    });
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    socket.on("state-changed", ({ _, state }) => {
      const payload = state;
      console.log("state-changed", payload);
      dispatch(setStateOne(payload[1]));
      dispatch(setStateTwo(payload[2]));
      dispatch(setStateGame(payload.game));
    });

    socket.on("player-joined", (ack) => {
      console.log("player-joined", ack);
    });

    socket.on("room-is-full", (data) => {
      console.log("room-is-full", data);
    });

    socket.on("player-left", (date) => {
      console.log("payer-left");
      syncState(game.gameCode.id);
    });

    ws = {
      socket: socket,
      createRoom,
      joinRoom,
      closeRoom,
      syncState,
      leaveRoom,
    };
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
