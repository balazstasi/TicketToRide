import { createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { WS_BASE } from "../../containers/config";
import { setGameCode } from "../slices/gameSlice";
import SocketAPI from "../socketAPI";

const socket = io.connect(WS_BASE);

SocketAPI.on("player-joined", ({ roomId, socketId }) => console.log(roomId, socketId));

const createRoom = createAsyncThunk("game/create-room", async function (_, thunkAPI) {
  return await socket.emit("create-room", 2, ({ status, roomId }) => {
    console.log("create-room", roomId, status);
    status === "ok" && thunkAPI.dispatch(setGameCode({ id: roomId }));
  });
});

const joinRoom = createAsyncThunk("game/join-room", async function (roomId, thunkAPI) {
  return await socket.emit("join-room", roomId, ({ status }) => {
    console.log("join-room", status);
    thunkAPI.dispatch(setGameCode({ id: roomId }));
  });
});

const syncState = createAsyncThunk("game/sync-state", async function (roomId, state, thunkAPI) {
  console.log(thunkAPI);
  return await socket.emit("sync-state", roomId, state, false, ({ status }) => {
    console.log("sync-state", state, status);
  });
});

const getState = createAsyncThunk("game/get-state", async function (roomId, thunkAPI) {
  return await socket.emit("get-state", roomId, ({ status }) => {
    console.log("get-state", status);
  });
});

const leaveRoom = createAsyncThunk("game/leave-room", async function (roomId, thunkAPI) {
  return await socket.emit("leave-room", roomId, ({ status }) => {
    console.log("leave-room", status);
  });
});

export { createRoom, joinRoom, syncState, getState, leaveRoom };
