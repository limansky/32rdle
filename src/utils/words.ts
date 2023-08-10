import { LetterState } from "../components/Letter";

export function wordStatus(word: string, guess: string): Array<LetterState> {
  const len = guess.length;
  const result = Array(len).fill(LetterState.Miss);
  const count = new Map<string, number>();

  [...word].forEach((c, i) => {
    if (c !== guess[i]) {
      count.set(c, (count.get(c) ?? 0) + 1);
    } else {
      result[i] = LetterState.Guess;
    }
  });

  [...guess].forEach((c, i) => {
    if (count.get(c) ?? 0 > 0) {
      if (word[i] !== c) {
        count.set(c, (count.get(c) ?? 0) - 1);
        result[i] = LetterState.WrongPosition;
      }
    }
  });
  return result;
}
