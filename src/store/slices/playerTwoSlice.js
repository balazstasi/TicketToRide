import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { MOVE_LIST, LOCOMOTIVE, GRAY } from "../../constants/constants";
import { cloneDeep } from "lodash";

export const playerTwoSlice = createSlice({
  name: "playerTwo",
  initialState: {
    name: "",
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
    cardsDrawnThisTurn: 100,
    destinations: [],
    collectedRoads: [],
    score: 0,
    justBuilt: false,
    lastMove: null,
    beforeLastMove: null,
    joined: false,
  },
  reducers: {
    setStateTwo: {
      reducer: (state, { payload }) => {
        Object.keys(payload).forEach((key) => (state[key] = cloneDeep(payload[key]) || null));
      },
    },
    setJoinedTwo: {
      reducer: (state, { payload }) => {
        state.joined = payload;
      },
    },
    collectRoadTwo: {
      reducer: (state, action) => {
        const removeColorHand = (color, amount) => {
          state.cards[color] -= amount;

          let counter = 0;
          while (counter < amount) {
            const index = state.hand.findIndex((card) => card === color);
            if (index === -1) return;
            state.hand.splice(index, 1);
            counter++;
          }
        };

        let { color, road } = action.payload;
        let roadLength = road.length;

        let canBeBuilt;
        let selectedWithoutLoc = [];
        if (color !== GRAY) {
          canBeBuilt =
            state.selectedCards.every(
              (card) => card.color === color || card.color === LOCOMOTIVE
            ) && state.selectedCards.length >= roadLength;
        } else {
          selectedWithoutLoc =
            state.selectedCards.filter((card) => card.color !== LOCOMOTIVE) || [];

          if (selectedWithoutLoc.length === 0) {
            canBeBuilt = false;
          } else {
            canBeBuilt =
              selectedWithoutLoc.every((card) => card.color === selectedWithoutLoc[0].color) &&
              state.selectedCards.length >= roadLength;
          }
        }

        if (canBeBuilt) {
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
          state.score = state.score + roadLength;

          state.justBuilt = true;
        }
      },
    },
    setJustBuiltTwo: {
      reducer: (state, { payload }) => {
        state.justBuilt = payload;
      },
    },
    addCardTwo: {
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

        if (cardIndex < 0) {
          state.selectedCards.push({ index, color });
        } else {
          state.selectedCards.splice(cardIndex, 1);
        }
      },
    },

    toggleDestinationTwo: {
      // Add Destination to array or delete it if it's already there
      reducer: (state, action) => {
        const destination = action.payload;
        const searchedDestIdx = state.destinations.findIndex((dest) => dest.id === destination.id);

        if (searchedDestIdx === -1) {
          state.destinations.push(destination);
        } else {
          state.destinations.splice(searchedDestIdx, 1);
        }
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
    setNameTwo: {
      reducer: (state, { payload }) => {
        state.name = payload;
      },
    },
    setLastMoveTwo: {
      reducer: (state, action) => {
        state.beforeLastMove = state.lastMove;
        state.lastMove = action.payload;
      },
    },
  },
});

export const {
  setStateTwo,
  addCardTwo,
  setLastMoveTwo,
  setNameTwo,
  toggleDestinationTwo,
  addScoreTwo,
  toggleCardTwo,
  drawCardTwo,
  setJustBuiltTwo,
  setCardsDrawnThisTurnTwo,
  collectRoadTwo,
  setJoinedTwo,
} = playerTwoSlice.actions;

export default playerTwoSlice.reducer;
