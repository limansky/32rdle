import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  tillTheEnd: boolean;
  setTillTheEnd: (value: boolean) => void;
  enterOnTheRight: boolean;
  setEnterOnTheRight: (value: boolean) => void;
  boardsPerRow: number;
  setBordsPerRow: (value: number) => void;
}

export const useSettingsStore = create<Settings>()(
  persist((set) => ({
    tillTheEnd: false,
    enterOnTheRight: true,
    boardsPerRow: 4,
    setTillTheEnd: (value: boolean) => set(() => ({ tillTheEnd: value })),
    setEnterOnTheRight: (value: boolean) => set(() => ({ enterOnTheRight: value })),
    setBordsPerRow: (value: number) => set(() => ({ boardsPerRow: value }))
  }), { name: "32rdle-settings" }
  )
)
