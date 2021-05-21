import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { MOVE_LIST } from "../../constants/constants";

export const playerTwoSlice = createSlice({
  name: "playerTwo",
  initialState: {
    name: "Niki",
    playerColor: "lightpink",
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
    hand: [],
    selectedCards: [],
    cardsDrawn: 0,
    destinations: [],
    collectedRoads: [],
    score: [],
    lastMove: null,
    beforeLastMove: null,
    cardsDrawnThisTurn: 0,
  },
  reducers: {
    collectRoadTwo: {
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
    addCardTwo: {
      reducer: (state, action) => {
        const colorCard = action.payload;
        state.cardsDrawn++;
        state.cardsDrawnThisturn++;
        state.cards[colorCard]++;
        state.hand.push(colorCard);
        state.beforeLastMove = state.lastMove;
        state.lastMove = MOVE_LIST.TAKE_CARD_FROM_DRAWN;
      },
    },
    drawCardTwo: {
      reducer: (state, _) => {
        const color = getRandomColor();
        state.cards[color]++;
        state.cardsDrawn++;
        state.hand.push(color);
      },
    },

    toggleCardTwo: {
      reducer: (state, { payload }) => {
        const { index, color } = payload;
        const cardIndex = state.selectedCards.findIndex((card) => card.index === index);

        console.log("CARD AT INDEX", index);

        if (cardIndex < 0) {
          console.log("NOT FOUND");
          state.selectedCards.push({ index, color });
        } else {
          console.log("FOUND");

          state.selectedCards.splice(cardIndex, 1);
        }
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
    reducer: (state, _) => {
      state.cardsDrawnThisTurn = 0;
    },
  },
});

export const {
  addCardTwo,
  toggleDestinationTwo,
  addScoreTwo,
  setStateTwo,
  toggleCardTwo,
  drawCardTwo,
  setCardsDrawnThisTurnTwo,
  collectRoadTwo,
} = playerTwoSlice.actions;

export default playerTwoSlice.reducer;
