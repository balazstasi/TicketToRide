import { createSlice, nanoid } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getRandomColor } from "../../utils/getRandomColor";
import { MOVE_LIST } from "../../constants/constants";

export const playerTwoSlice = createSlice({
  name: "playerTwo",
  initialState: {
    name: "Niki",
    trains: 45,
    cards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      pink: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    deck: [],
    cardsDrawn: 0,
    destinations: [],
    score: [],
    lastMove: null,
    beforeLastMove: null,
    cardsDrawnThisTurn: 0,
  },
  reducers: {
    setStateTwo: {
      reducer: (state, action) => {
        state = cloneDeep(state);
      },
    },
    addCardTwo: {
      reducer: (state, action) => {
        // if (state.cardsDrawn < 5) {
        state.cardsDrawn++;
        state.cardsDrawnThisturn++;
        state.cards[action.payload]++;
        state.beforeLastMove = state.lastMove;
        state.lastMove = MOVE_LIST.TAKE_CARD_FROM_DRAWN;
        // }
      },
    },
    drawCardTwo: {
      reducer: (state, _) => {
        // if (state.cardsDrawn < 5) {
        const color = getRandomColor();
        state.cards[color]++;
        state.cardsDrawn++;
        // }
      },
    },
    toggleDestinationTwo: {
      // Add Destination to array or delete it if it's already there
      reducer: (state, action) => {
        console.log("ACTION", action);
        const destination = action.payload;
        const searchedDestIdx = state.destinations.findIndex((dest) => dest.id === destination.id);

        state.destinations.forEach((d) => console.log(d));
        console.log(searchedDestIdx);
        if (searchedDestIdx === -1) {
          console.log("ADDING");
          state.destinations.push(destination);
        } else {
          console.log("REMOVING");
          state.destinations.splice(searchedDestIdx, 1);
        }
      },
    },
  },
  addScoreTwo: {
    reducer: (state, action) => {
      state.score += action.payload;
    },
  },
  setCardsDrawnThisTurnTwo: {
    reducer: (state, action) => {
      state.cardsDrawnThisTurn = 0;
    },
  },
});

export const {
  addCardTwo,
  toggleDestinationTwo,
  addScoreTwo,
  setStateTwo,
  drawCardTwo,
  setCardsDrawnThisTurnTwo,
} = playerTwoSlice.actions;

export default playerTwoSlice.reducer;
