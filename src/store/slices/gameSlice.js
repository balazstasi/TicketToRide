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
    cards: {
      black: 12,
      blue: 12,
      green: 12,
      orange: 12,
      pink: 12,
      red: 12,
      white: 12,
      yellow: 12,
      locomotive: 14,
    },
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
      reducer: (state, _) => {
        state.deck = [1, 2, 3, 4, 5].map((_) => {
          const color = getRandomColor();
          state.fullDeck[color]--;
          return color;
        });
      },
    },

    drawCard: {
      reducer: (state, action) => {
        if (state.deck.filter((color) => color === "locomotive").length >= 3) {
          state.deck = [1, 2, 3, 4, 5].map((_) => {
            const color = getRandomColor();
            state.fullDeck[color]--;
            return state.fullDeck[color] > 0 ? color : null;
          });
        } else {
          const color = getRandomColor();
          state.fullDeck[color]--;
          state.deck.length < 5 && state.fullDeck[color] > 0 && state.deck.push(getRandomColor());
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
