const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME_STATE":
      return {
        ...state,
        gameState: action.payload,
      };

    default:
      throw new Error("The action type provided can't be found");
  }
};

export default Reducer;
