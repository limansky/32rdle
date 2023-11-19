import { BoardState } from "../model/BoardState";
import { KeyState } from "../model/KeyState";
import { LetterState } from "../model/LetterState";

const ALPHABET = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

export function wordKeyState(statuses: Array<Array<[string, LetterState]>>): Map<string, KeyState> {
  const keyState = new Map(ALPHABET.map(l => [l, KeyState.Unknown]));
  for (let ws of statuses) {
    ws.forEach(([c, s]) => {
      const newState = s == LetterState.Guess ? KeyState.Guess : s == LetterState.WrongPosition ? KeyState.WrongPosition : KeyState.Absent;
      if ((keyState.get(c) ?? KeyState.Unknown) < newState) {
        keyState.set(c, newState);
      }
    })
  }
  return keyState;
}

export function globalKeyState(answer: string[], words: string[], states: BoardState[]): Map<string, KeyState> {
  const knownLetters = new Set(words.flatMap(x => [...x]));
  const allLetters = new Set(answer.flatMap((x, i) => states[i] !== BoardState.Solved ? [...x] : []));
  return new Map(ALPHABET.map(l => [l, knownLetters.has(l) ? (allLetters.has(l) ? KeyState.Known : KeyState.Absent) : KeyState.Unknown]));
}
