import { BoardState } from "../model/BoardState";
import { InputState } from "../model/InputState";
import { LetterState } from "../model/LetterState";

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

export function wordStatuses(
  answer: string[],
  words: string[],
): Array<Array<Array<[string, LetterState]>>> {
  const result = [];

  for (const a of answer) {
    const as: Array<Array<[string, LetterState]>> = [];
    for (const w of words) {
      const statuses = wordStatus(a, w);
      as.push(statuses.map((s, i) => [w[i], s]));
      if (w === a) break;
    }
    result.push(as);
  }

  return result;
}

export function letterStat(
  wordStatus: Array<Array<[string, LetterState]>>,
): Map<string, number> {
  const result = new Map<string, number>();

  for (const ws of wordStatus) {
    const count = new Map<string, number>();
    ws.forEach(([l, s]) => {
      const inc = s === LetterState.Miss ? 0 : 1;
      count.set(l, count.get(l) ?? 0 + inc);
      result.set(l, Math.max(result.get(l) ?? 0, count.get(l) ?? 0));
    });
  }

  return result;
}

export function calcInputStates(
  dict: string[],
  initial: Array<Array<InputState>>,
  wordsWithStatuses: Array<Array<Array<[string, LetterState]>>>,
  states: BoardState[],
  letterStat: Array<Map<string, number>>,
  newInput: string,
): Array<Array<InputState>> {
  const s = newInput[newInput.length - 1];
  if (newInput.length === 5 && !dict.includes(newInput)) {
    return initial.map((is) => [...is, InputState.Invalid]);
  } else {
    return initial.map((bis, bid) => {
      if (states[bid] !== BoardState.Solved) {
        const [lastState] = bis.slice(-1);
        if (lastState === undefined || lastState === InputState.Match) {
          const letter = newInput[newInput.length - 1];
          let newState = InputState.Match;
          if (letterStat[bid].get(letter) === 0) {
            newState = InputState.Unmatch;
          } else {
            for (const ws of wordsWithStatuses[bid]) {
              const [l, st] = ws[newInput.length - 1];
              if ((l === s) !== (st === LetterState.Guess)) {
                newState = InputState.Unmatch;
                break;
              }
            }
          }
          return [...bis, newState];
        } else return [...bis, lastState];
      } else return [];
    });
  }
}
