import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { createRoom, syncActionGame, syncStateGame } from "../thunk/actions";
import { cloneDeep } from "lodash";
import { socket } from "../../index";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    playerOneName: "",
    playerTwoName: "",
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
    thrownOutCards: [],
    longDestinationOne: {},
    longDestinationTwo: {},
  },

  reducers: {
    setPlayerName: {
      reducer: (state, { payload }) => {
        if (payload.number === 1) {
          state.playerOneName = payload.name;
        } else {
          state.playerTwoName = payload.name;
        }
      },
    },

    setLongDestination: {
      reducer: (state, { payload }) => {
        if (payload.player === 1) state.longDestinationOne = payload.destination;
        else state.longDestinationTwo = payload.destination;
      },
    },

    setStateGame: {
      reducer: (state, { payload }) => {
        Object.keys(payload).forEach((key) => (state[key] = cloneDeep(payload[key]) || null));
      },
    },

    setGamePhase: {
      reducer: (state, action) => {
        state.gamePhase = action.payload;
      },
    },

    setGameCode: {
      reducer: (state, { payload }) => {
        state.gameCode = payload;
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
      reducer: (state, _) => {
        if (state.deck.filter((color) => color === "locomotive").length >= 3) {
          state.deck = [1, 2, 3, 4, 5].map((_) => {
            let color = getRandomColor();
            state.cards[color]--;
            while (state.cards[color] <= 0) color = getRandomColor();
            return color;
          });
        } else {
          let color = getRandomColor();
          while (state.colors[color] <= 0) color = getRandomColor();
          state.cards[color]--;
          state.deck.length < 5 && state.cards[color] > 0 && state.deck.push(getRandomColor());
          return color;
        }
      },
    },

    removeCard: {
      reducer: (state, action) => {
        state.thrownOutCards.push(action.payload);
        state.deck.splice(action.payload, 1);
        state.deck.length < 5 && state.deck.push(getRandomColor());
      },
    },
  },
  throwOutCard: {
    reducer: (state, action) => {
      state.throwOutCard.push(action.payload);
    },
  },
  extraReducers: {
    [createRoom.pending]: (state, action) => {},
  },
});

export const {
  setStateGame,
  setGamePhase,
  setPlayerName,
  setGameCode,
  setTurnPlayer,
  resetDeck,
  drawCard,
  removeCard,
  throwOutCard,
  setLongDestination,
} = gameSlice.actions;

export default gameSlice.reducer;
