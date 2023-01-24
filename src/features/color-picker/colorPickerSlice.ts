import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ColorState {
  historyIndex: number;
  colorHistory: string[];
  colors: string[];
}

const colors = ["#f7e6df", "#cccae5", "#f9cabb", "#ffc654", "#19284a"];

const initialState: ColorState = {
  historyIndex: 0,
  colorHistory: [colors[0]],
  colors,
};

const getCurrentColor = (colorState: ColorState) =>
  colorState.colorHistory[colorState.historyIndex];

export const colorPickerSlice = createSlice({
  name: "colorPicker",
  initialState,
  reducers: {
    previousColor: (state) => {
      state.historyIndex = Math.max(state.historyIndex - 1, 0);
    },
    nextColor: (state) => {
      state.historyIndex = Math.min(
        state.colorHistory.length - 1,
        state.historyIndex + 1
      );
    },
    randomColor: (state) => {
      const proposedIndex = Math.floor(state.colors.length * Math.random());
      const nextColorIndex = () =>
        proposedIndex === state.colors.length - 1 ? 0 : proposedIndex + 1;
      const colorIndex =
        state.colors[proposedIndex] === getCurrentColor(state)
          ? nextColorIndex()
          : proposedIndex;
      state.colorHistory.push(state.colors[colorIndex]);
      state.historyIndex = state.colorHistory.length - 1;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.colorHistory.push(action.payload);
      state.historyIndex = state.colorHistory.length - 1;
    },
    setHistoryIndex: (state, action: PayloadAction<number>) => {
      state.historyIndex = action.payload;
    },
  },
});

export const {
  nextColor,
  previousColor,
  randomColor,
  setColor,
  setHistoryIndex,
} = colorPickerSlice.actions;

export const selectCurrentColor = (state: RootState) =>
  getCurrentColor(state.colorPicker);

export default colorPickerSlice.reducer;
