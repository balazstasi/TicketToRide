import { configureStore } from "@reduxjs/toolkit";
import playerOneReducer from "./slices/playerOneSlice";
import gameReducer from "./slices/gameSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    playerOne: playerOneReducer,
    // playerTwo: playerTwoReducer,
  },
});
