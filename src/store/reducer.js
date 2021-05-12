import { trainColors } from "../constants/trainColors";

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME_STATE":
      return {
        ...state,
        gameState: action.payload,
      };
    case "SET_GAME_PHASE":
      return {
        ...state,
        gamePhase: action.payload,
      };
    case "ADD_CARD_TO_PLAYER":
      const { color, amount } = action.payload;
      const player = state[1];
      return {
        ...state,
        1: {
          ...player,
          cards: {
            ...player.cards,
            [color]: player.cards[color] + amount,
          },
        },
      };
    case "SET_GAME_CODE":
      return {
        ...state,
        gameCode: action.payload,
      };
    case "ADD_DESTINATION_TO_PLAYER":
      const { playerNumber, destination } = action.payload;
      return {
        ...state,
        [playerNumber]: {
          ...state[playerNumber],
          destinations: [...state[playerNumber].destinations, destination],
        },
      };

    default:
      throw new Error("The action type provided can't be found");
  }
};

export default Reducer;
