import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { playerOneSlice } from "./playerOneSlice";
import { playerTwoSlice } from "./playerTwoSlice";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    turnPlayer: null,
    gameState: "",
    gamePhase: "",
    gameCode: "",
    deck: [1, 2, 3, 4, 5].map((_) => getRandomColor()),
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

    resetDeck: {
      reducer: (state, action) => {
        state.deck = [1, 2, 3, 4, 5].map((_) => getRandomColor());
      },
    },

    drawCard: {
      reducer: (state, action) => {
        if (state.deck.filter((color) => color === "locomotive").length >= 3) {
          state.deck = [1, 2, 3, 4, 5].map((_) => getRandomColor());
        } else {
          state.deck.length < 5 && state.deck.push(getRandomColor());
        }
      },
    },

    removeCard: {
      reducer: (state, action) => {
        state.deck.splice(action.payload, 1);
        state.deck.length < 5 && state.deck.push(getRandomColor());
      },
    },
  },
});

export const {
  setState,
  setGamePhase,
  setGameCode,
  setTurnPlayer,
  resetDeck,
  drawCard,
  removeCard,
} = gameSlice.actions;

export default gameSlice.reducer;
