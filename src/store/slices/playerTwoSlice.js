import { createSlice, nanoid } from "@reduxjs/toolkit";

export const playerTwoSlice = createSlice({
  name: "playerTwo",
  initialState: {
    trains: 45,
    cards: {
      blue: 0,
      green: 0,
      yellow: 0,
      rainbow: 0,
      black: 0,
      purple: 0,
      white: 0,
    },
    destinations: [],
  },
  reducers: {
    addCardTwo: {
      reducer: (state, action) => {
        const { color } = action.payload;
        state.cards[color]++;
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
});

export const { addCardTwo, toggleDestinationTwo } = playerTwoSlice.actions;

export default playerTwoSlice.reducer;