import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { GRAY, LOCOMOTIVE, MOVE_LIST } from "../../constants/constants";

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
    longDestinations: [],
    drawnDestinations: [],
    completedDestinations: [],
    score: 0,
    collectedRoads: [],
    lastDrawnCard: null,
    lastMove: null,
    beforeLastMove: null,
    cardsDrawnThisTurn: 0,
    justBuilt: false,
  },
  reducers: {
    collectRoadOne: {
      reducer: (state, action) => {
        function removeColorHand(color, amount) {
          state.cards[color] -= amount;

          let counter = 0;
          while (counter < amount) {
            const index = state.hand.findIndex((card) => card === color);
            if (index === -1) return;
            state.hand.splice(index, 1);
            counter++;
          }
        }

        let { color, road } = action.payload;
        let roadLength = road.length;

        let canBeBuilt = false;
        let selectedWithoutLoc = [];
        if (color !== GRAY) {
          canBeBuilt =
            state.selectedCards.every(
              (card) => card.color === color || card.color === LOCOMOTIVE
            ) && state.selectedCards.length >= roadLength;
        } else {
          selectedWithoutLoc = state.selectedCards.filter((card) => card.color !== LOCOMOTIVE);

          if (selectedWithoutLoc.length === 0) {
            canBeBuilt = false;
          } else {
            canBeBuilt =
              selectedWithoutLoc.every((card) => card.color === selectedWithoutLoc[0].color) &&
              state.selectedCards.length >= roadLength;
          }
        }

        if (canBeBuilt && state.cardsDrawnThisTurn === 0) {
          state.score = state.score + roadLength;
          state.trains -= roadLength;
          state.collectedRoads.push(action.payload);

          if (color === GRAY) color = selectedWithoutLoc[0].color;
          const locomotivesSelected = state.selectedCards.filter(
            (card) => card.color === LOCOMOTIVE
          );
          const numOfLocomotivesSelected = locomotivesSelected.length;
          const neededColorSelected = state.selectedCards.filter((card) => card.color === color);
          const numOfNeededColorSelected = neededColorSelected.length;

          if (numOfNeededColorSelected >= roadLength) {
            state.cards[color] -= roadLength;
            removeColorHand(color, roadLength);
          } else if (numOfNeededColorSelected + numOfLocomotivesSelected >= roadLength) {
            state.cards[color] -= numOfNeededColorSelected;
            removeColorHand(color, numOfNeededColorSelected);
            let lengthAfterColoredCards = roadLength - numOfNeededColorSelected + 1;

            removeColorHand(LOCOMOTIVE, lengthAfterColoredCards);
          }

          state.selectedCards = [];

          state.lastMove = MOVE_LIST.MAKE_ROUTE;

          state.justBuilt = true;
        }
      },
    },
    setJustBuiltOne: {
      reducer: (state, { payload }) => {
        state.justBuilt = payload;
      },
    },
    addCardOne: {
      reducer: (state, action) => {
        const colorCard = action.payload;
        state.lastDrawnCard = colorCard;
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
        if (state.lastDrawnCard !== LOCOMOTIVE) {
          state.hand.push(color);
          state.cards[color]++;
          state.cardsDrawn++;
          state.lastDrawnCard = color;
        }
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

    toggleDestinationOne: {
      reducer: (state, action) => {
        const { type } = action.payload;
        const destination = action.payload;

        const searchedDestinationIndex = state.destinations.findIndex(
          (dest) => dest.id === destination.id
        );

        if (searchedDestinationIndex === -1) {
          state.destinations.push(destination);
        } else {
          state.destinations.splice(searchedDestinationIndex, 1);
        }
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

    removeColorFromHand: {
      reducer: (state, action) => {
        const { color, amount } = action.payload;

        state.cards[color] -= amount;

        let counter = 0;
        while (counter < amount) {
          const index = state.hand.findIndex((cardColor) => cardColor === color);
          state.hand.splice(index, 1);
          counter++;
        }
      },
    },
  },
});

export const {
  addCardOne,
  toggleDestinationOne,
  addScoreOne,
  setStateOne,
  setJustBuiltOne,
  drawCardOne,
  toggleCardOne,
  setCardsDrawnThisTurnOne,
  collectRoadOne,
} = playerOneSlice.actions;

export default playerOneSlice.reducer;
