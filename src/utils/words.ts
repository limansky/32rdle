import { LetterState } from "../components/Letter";

export function wordStatus(word: string, guess: string): Array<LetterState> {
  const len = guess.length;
  var result = Array(len).fill(LetterState.Miss);
  var ref = Array(len).fill(-1);

  Array.from(guess).forEach((c, i) => {
    if (word[i] == c) {
      result[i] = LetterState.Guess;
      if (ref[i] != -1) {
        result[ref[i]] = LetterState.Miss;
      }
      ref[i] = i;
    } else {
      for (let j = 0; j < len; j++) {
        if (word[j] == c && ref[j] == -1) {
          ref[j] = i;
          result[i] = LetterState.WrongPosition;
          break;
        }
      }
    }
  });

  return result;
}
