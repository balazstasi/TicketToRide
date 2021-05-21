import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
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
    score: [],
    collectedRoads: [],
    lastMove: null,
    beforeLastMove: null,
    cardsDrawnThisTurn: 0,
  },
  reducers: {
    collectRoadOne: {
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
          selectedWithoutLoc = state.selectedCards.filter((card) => card.color !== LOCOMOTIVE) || [
            LOCOMOTIVE,
          ];
          canBeBuilt = selectedWithoutLoc.every(
            (card) => card.color === selectedWithoutLoc[0].color
          );
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

            // let i = 0;
            // neededColorSelected.forEach((card) => {
            //   if (i < roadLength) {
            //     state.hand.splice(card.index, 1);

            //     i++;
            //   }
            // });
            removeColorHand(color, roadLength);
          } else if (numOfNeededColorSelected + numOfLocomotivesSelected >= roadLength) {
            state.cards[color] -= numOfNeededColorSelected;
            // neededColorSelected.forEach((card) => {
            //   state.hand.splice(card.index, 1);
            // });
            removeColorHand(color, numOfNeededColorSelected);
            let lengthAfterColoredCards = roadLength - numOfNeededColorSelected + 1;
            // const handCopy = [...state.hand];
            // handCopy.forEach((cardColor, index) => {
            //   if (cardColor === LOCOMOTIVE) {
            //     if (lengthAfterColoredCards > 0) {
            //       state.hand.splice(index, 1);
            //       lengthAfterColoredCards--;
            //     }
            //   }
            // });
            removeColorHand(LOCOMOTIVE, lengthAfterColoredCards);
          }

          state.selectedCards = [];
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
