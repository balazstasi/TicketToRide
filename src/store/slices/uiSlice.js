import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    firstX: 0,
    firstY: 0,
    secondX: 0,
    secondY: 0,

    actualPlayer: 1,
  },

  reducers: {
    setActualPlayer: {
      reducer: (state, action) => {
        state.actualPlayer = action.payload;
      },
    },
    highlightCity: {
      reducer: (state, action) => {
        const { xFirst, yFirst, xSecond, ySecond } = action.payload;
        console.log(action.payload);
        state.firstX = xFirst;
        state.firstY = yFirst;
        state.secondX = xSecond;
        state.secondY = ySecond;
      },
    },
  },
});

export const { highlightCity, setActualPlayer } = uiSlice.actions;

export default uiSlice.reducer;
