import { configureStore } from "@reduxjs/toolkit";
import playerOneReducer from "./slices/playerOneSlice";
import playerTwoReducer from "./slices/playerTwoSlice";
import uiReducer from "./slices/uiSlice";
import gameReducer from "./slices/gameSlice";
import reduxWebsocket from "@giantmachines/redux-websocket";
import thunk from "redux-thunk";

// const reduxWebsocketMiddleware = reduxWebsocket();

export default configureStore({
  reducer: {
    game: gameReducer,
    playerOne: playerOneReducer,
    playerTwo: playerTwoReducer,
    ui: uiReducer,
  },

  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});
