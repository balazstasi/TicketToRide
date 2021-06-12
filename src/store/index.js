import { configureStore } from "@reduxjs/toolkit";
import playerOneReducer from "./slices/playerOneSlice";
import playerTwoReducer from "./slices/playerTwoSlice";
import uiReducer from "./slices/uiSlice";
import gameReducer from "./slices/gameSlice";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// const reduxWebsocketMiddleware = reduxWebsocket();

export default configureStore({
  reducer: {
    game: gameReducer,
    playerOne: playerOneReducer,
    playerTwo: playerTwoReducer,
    ui: uiReducer,
    router: connectRouter(history),
  },

  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});
