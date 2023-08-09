import { LetterState } from "../components/Letter";

export function wordStatus(word: string, guess: string): Array<LetterState> {
  return Array.from(word).map((c, i) => {
    return guess[i] === c ? LetterState.Guess : guess.indexOf(c) !== -1 ? LetterState.WrongPosition : LetterState.Miss;
  });
}
