import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { getRandomColor } from "../../utils/getRandomColor";
import { MOVE_LIST } from "../../constants/constants";

/*
  A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

  This API is the standard approach for writing Redux logic.

  Internally, it uses createAction and createReducer
*/
export const playerOneSlice = createSlice({
  name: "playerOne",
  initialState: {
    name: "Balazs",
    playerColor: "teal",
    trains: 45,
    cards: {
      black: 0,
      blue: 0,
      green: 0,
      orange: 0,
      purple: 0,
      red: 0,
      white: 0,
      yellow: 0,
      locomotive: 0,
    },
    cardsDrawn: 0,
    hand: [],
    selectedCards: [],
    destinations: [],
    score: [],
    collectedRoads: [],
    lastMove: null,
    beforeLastMove: null,
    cardsDrawnThisTurn: 0,
  },
  reducers: {
    collectRoadOne: {
      reducer: (state, action) => {
        const { id, color, road } = action.payload;
        const cardAmount = state.cards[color];
        let roadLength = road.length;

        if (cardAmount >= roadLength && state.trains >= roadLength) {
          // If there are enough colored cards subtract them and build the path
          if (!state.collectedRoads.find((road) => road.id === id)) {
            state.trains -= roadLength;
            state.collectedRoads.push(action.payload);
            state.trains -= roadLength;
            state.cards[color] -= roadLength;
          }
        } else if (
          cardAmount + state.cards.locomotive >= roadLength &&
          state.trains >= roadLength
        ) {
          // If there aren't enough colored cards we use locomotives too
          if (!state.collectedRoads.find((road) => road.id === id)) {
            state.trains -= roadLength;
            state.collectedRoads.push(action.payload);
            roadLength -= state.cards[color];
            state.cards[color] = 0;
            state.cards.locomotive -= roadLength;
          }
        }
      },
    },
    addCardOne: {
      reducer: (state, action) => {
        const colorCard = action.payload;
        state.cardsDrawn++;
        state.cardsDrawnThisTurn++;
        state.cards[colorCard]++;
        state.hand.push(colorCard);
        state.beforeLastMove = state.lastMove;
        state.lastMove = MOVE_LIST.TAKE_CARD_FROM_DRAWN;
      },
    },
    drawCardOne: {
      reducer: (state, _) => {
        const color = getRandomColor();
        state.hand.push(color);
        state.cards[color]++;
        state.cardsDrawn++;
      },
    },
    toggleCardOne: {
      reducer: (state, { payload }) => {
        const { index, color } = payload;
        const cardIndex = state.selectedCards.findIndex((card) => card.index === index);

        if (cardIndex < 0) state.selectedCards.push({ index, color });
        else state.selectedCards.splice(cardIndex, 1);
      },
    },

    // Add Destination to array or delete it if it's already there
    toggleDestinationOne: {
      reducer: (state, action) => {
        const destination = action.payload;
        const searchedDestIdx = state.destinations.findIndex((dest) => dest.id === destination.id);

        state.destinations.forEach((d) => console.log(d));
        console.log(searchedDestIdx);
        if (searchedDestIdx === -1) {
          state.destinations.push(destination);
        } else {
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
  setCardsDrawnThisTurnOne: {
    reducer: (state, _) => {
      state.cardsDrawnThisTurn = 0;
    },
  },
});

export const {
  addCardOne,
  toggleDestinationOne,
  addScoreOne,
  setStateOne,
  drawCardOne,
  toggleCardOne,
  setCardsDrawnThisTurnOne,
  collectRoadOne,
} = playerOneSlice.actions;

export default playerOneSlice.reducer;
