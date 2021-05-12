import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    turnPlayer: null,
    gameState: "",
    gamePhase: "123",
    gameCode: "",
  },

  reducers: {
    setState: {
      reducer: (state, action) => {
        state = action.payload;
      },
    },

    setGamePhase: {
      reducer: (state, action) => {
        state.gamePhase = action.payload;
      },
    },

    setGameCode: {
      reducer: (state, action) => {
        state.gameCode = action.payload;
      },
    },

    setTurnPlayer: {
      reducer: (state, action) => {
        state.turnPlayer = action.payload;
      },
    },
  },
});

export const { setState, setGamePhase, setGameCode, setTurnPlayer } = gameSlice.actions;

export default gameSlice.reducer;
