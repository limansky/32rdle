import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: Array<string> = [];

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    }
  }
});

export const { addWord } = wordsSlice.actions;
export const wordsSelector = (state: RootState) => state.wordsReducer;
export default wordsSlice.reducer;
