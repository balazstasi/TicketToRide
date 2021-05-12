import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

/*
  A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

  This API is the standard approach for writing Redux logic.

  Internally, it uses createAction and createReducer
*/

export const playerOneSlice = createSlice({
  name: "playerOne",
  initialState: {
    name: "Balazs",
    trains: 45,
    cards: {
      blue: 0,
      green: 0,
      yellow: 3,
      rainbow: 0,
      black: 5,
      purple: 0,
      white: 0,
    },
    destinations: [],
    score: [],
  },
  reducers: {
    setStateOne: {
      reducer: (state, action) => {
        state = cloneDeep(state);
      },
    },
    addCardOne: {
      reducer: (state, action) => {
        const { color } = action.payload;
        state.cards[color]++;
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

export const { addCardOne, toggleDestinationOne, addScoreOne, setStateOne } =
  playerOneSlice.actions;

export default playerOneSlice.reducer;
