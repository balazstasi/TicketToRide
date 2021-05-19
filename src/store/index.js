import { configureStore } from "@reduxjs/toolkit";
import playerOneReducer from "./slices/playerOneSlice";
import playerTwoReducer from "./slices/playerTwoSlice";
import uiReducer from "./slices/uiSlice";
import gameReducer from "./slices/gameSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    playerOne: playerOneReducer,
    playerTwo: playerTwoReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
