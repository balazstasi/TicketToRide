import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getRandomColor } from "../../utils/getRandomColor";

/*
  A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

  This API is the standard approach for writing Redux logic.

  Internally, it uses createAction and createReducer
*/

export const BLACK = "black";
export const BLUE = "blue";
export const GREEN = "green";
export const ORANGE = "orange";
export const PINK = "pink";
export const RED = "red";
export const WHITE = "white";
export const YELLOW = "yellow";
export const LOCOMOTIVE = "locomotive";
export const playerOneSlice = createSlice({
  name: "playerOne",
  initialState: {
    name: "Balazs",
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
    cardsDrawn: 0,
    deck: [],
    destinations: [],
    score: [],
    movesSoFar: [],
  },
  reducers: {
    setStateOne: {
      reducer: (state, action) => {
        state = cloneDeep(state);
      },
    },
    addCardOne: {
      reducer: (state, action) => {
        if (state.cardsDrawn < 5) {
          state.cardsDrawn++;
          state.cards[action.payload]++;
        }
      },
    },
    drawCardOne: {
      reducer: (state, _) => {
        if (state.cardsDrawn < 5) {
          const color = getRandomColor();
          state.cards[color]++;
          state.cardsDrawn++;
        }
      },
    },

    // Add Destination to array or delete it if it's already there
    toggleDestinationOne: {
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
  addScoreOne: {
    reducer: (state, action) => {
      state.score += action.payload;
    },
  },
});

export const { addCardOne, toggleDestinationOne, addScoreOne, setStateOne, drawCardOne } =
  playerOneSlice.actions;

export default playerOneSlice.reducer;
