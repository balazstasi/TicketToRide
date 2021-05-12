import { configureStore } from "@reduxjs/toolkit";
import playerOneReducer from "./slices/playerOneSlice";
import playerTwoReducer from "./slices/playerTwoSlice";
import gameReducer from "./slices/gameSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    playerOne: playerOneReducer,
    playerTwo: playerTwoReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
