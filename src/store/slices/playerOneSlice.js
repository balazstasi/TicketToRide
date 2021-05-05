import { createSlice, nanoid } from "@reduxjs/toolkit";

export const playerOneSlice = createSlice({
  name: "playerOne",
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
    addCard: {
      reducer: (state, action) => {
        const { color } = action.payload;
        state.cards[color]++;
      },
    },
    addDestination: {
      // Add Destination to array or delete it if it's already there
      reducer: (state, action) => {
        const { destination } = action.payload;
        const searchedDestIdx = state.destinations.findIndex((dest) => dest.id === destination.id);
        if (!searchedDestIdx) {
          state.destinations.push(destination);
        } else {
          state.destinations.splice(searchedDestIdx, 1);
        }
      },
    },
  },
});

export const { addCard, addDestination } = playerOneSlice.actions;

export default playerOneSlice.reducer;
