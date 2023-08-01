import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice";

export const store =  configureStore({
  reducer: {
    wordsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
