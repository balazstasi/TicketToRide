import { createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { WS_BASE } from "../../containers/config";
import { setGameCode, setTurnPlayer } from "../slices/gameSlice";
import { setJoinedOne, setNameOne } from "../slices/playerOneSlice";
import { setActualPlayer } from "../slices/uiSlice";
import { socket } from "../../index";
import { connect } from "@giantmachines/redux-websocket";

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
    thunkAPI.dispatch(setTurnPlayer(1));
    thunkAPI.dispatch(setActualPlayer(1));
    thunkAPI.dispatch(setJoinedOne(true));
  });
});

const syncStateGame = createAsyncThunk("game/sync-state", async function (roomId, state) {
  return await socket.emit("sync-state", roomId, state, false, (ack) =>
    console.log("sync-state-game", ack.status, ack.message)
  );
});
const syncStateOne = createAsyncThunk("playerOne/sync-state", async function (roomId, state) {
  return await socket.emit("sync-state", roomId, state, true, (ack) =>
    console.log("sync-state-game", ack.status)
  );
});
const syncStateTwo = createAsyncThunk("playerTwo/sync-state", async function (roomId, state) {
  return await socket.emit("sync-state", roomId, state, true, (ack) =>
    console.log("sync-state-game", ack.status)
  );
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

export { createRoom, joinRoom, getState, leaveRoom, syncStateGame, syncStateOne, syncStateTwo };

// const syncActionGame = createAsyncThunk(
//   "game/sync-action",
//   async function ({ roomId, action }, thunkAPI) {
//     thunkAPI.dispatch(action);
//     return await socket.emit("sync-action", roomId, action, true, ({ status, message }) => {
//       console.log("sync-action", status, message);
//     });
//   }
// );
// const syncActionOne = createAsyncThunk(
//   "playerOne/sync-action",
//   async function (roomId, action, thunkApi) {
//     thunkApi.dispatch(action);
//     return await socket.emit("sync-action", roomId, action, true, ({ status, message }) => {
//       console.log("sync-action", status, message);
//     });
//   }
// );
// const syncActionTwo = createAsyncThunk(
//   "playerTwo/sync-action",
//   async function (roomId, action, thunkAPI) {
//     thunkAPI.dispatch(action);
//     return await socket.emit("sync-action", roomId, action, true, (ack) => {
//       console.log(ack);
//     });
//   }
// );
// const syncActionTwo = createAsyncThunk(
//   "playerTwo/sync-action",
//   async function (roomId, action, thunkAPI) {
//     thunkAPI.dispatch(action);
//     return await socket.emit("sync-action", roomId, action, true, (ack) => {
//       console.log(ack);
//     });
//   }
// );
