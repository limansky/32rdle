import { create } from "zustand";

interface Words {
  words: Array<string>;
  addWord: (word: string) => void;
}

export const useWordsStore = create<Words>((set) => ({
  words: [],
  addWord: (word: string) => set((state) => ({ ...state, words: [...state.words, word] }))
}));
