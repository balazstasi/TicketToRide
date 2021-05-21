import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "../../utils/getRandomColor";
import { MOVE_LIST, LOCOMOTIVE } from "../../constants/constants";

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
        const { color, road } = action.payload;
        let roadLength = road.length;

        const canBeBuilt =
          state.selectedCards.every((card) => card.color === color || card.color === LOCOMOTIVE) &&
          state.selectedCards.length >= roadLength;
        console.log(roadLength);
        if (canBeBuilt) {
          state.trains -= roadLength;
          state.collectedRoads.push(action.payload);

          const locomotivesSelected = state.selectedCards.filter(
            (card) => card.color === LOCOMOTIVE
          );
          const numOfLocomotivesSelected = locomotivesSelected.length;
          const neededColorSelected = state.selectedCards.filter((card) => card.color === color);
          const numOfNeededColorSelected = neededColorSelected.length;

          if (numOfNeededColorSelected >= roadLength) {
            state.cards[color] -= roadLength;
            let i = 0;
            neededColorSelected.forEach((card) => {
              if (i < roadLength) {
                state.hand.splice(card.index, 1);
                i++;
              }
            });
          } else if (numOfNeededColorSelected + numOfLocomotivesSelected >= roadLength) {
            state.cards[color] -= numOfNeededColorSelected;
            neededColorSelected.forEach((card) => {
              state.hand.splice(card.index, 1);
            });
            let lengthAfterColoredCards = roadLength - numOfNeededColorSelected + 1;
            console.log(lengthAfterColoredCards);

            const handCopy = [...state.hand];
            handCopy.forEach((color, index) => {
              if (color === LOCOMOTIVE) {
                if (lengthAfterColoredCards > 0) {
                  state.hand.splice(index, 1);
                  lengthAfterColoredCards--;
                }
              }
            });
          }

          state.selectedCards = [];
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
