import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameMode } from "../model/GameMode";

interface Words {
  mode: GameMode;
  id: number,
  seed: number,
  words: Array<string>;
  addWord: (word: string) => void;
  startDaily: (id: number) => void;
  startRandom: (seed: number) => void;
}

export const useWordsStore = create<Words>()(
  persist((set) => ({
    mode: GameMode.Daily,
    id: 0,
    seed: 0,
    words: [],
    addWord: (word: string) => set((state) => ({ words: [...state.words, word] })),
    startDaily: (i: number) => set({ mode: GameMode.Daily, id: i, seed: 0, words: [] }),
    startRandom: (s: number) => set({ mode: GameMode.Random, id: 0, seed: s, words: [] })
  }), { name: "32rdle-state" }
  )
);
