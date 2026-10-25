import { expect, test } from "vitest";
import { LetterState } from "../model/LetterState";
import { letterStat, wordStatus } from "./words";

test.each([
  [
    "пакля",
    "кабак",
    [
      LetterState.WrongPosition,
      LetterState.Guess,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ],
  ],
  [
    "кабак",
    "пакля",
    [
      LetterState.Miss,
      LetterState.Guess,
      LetterState.WrongPosition,
      LetterState.Miss,
      LetterState.Miss,
    ],
  ],
  [
    "кабак",
    "папка",
    [
      LetterState.Miss,
      LetterState.Guess,
      LetterState.Miss,
      LetterState.WrongPosition,
      LetterState.WrongPosition,
    ],
  ],
  [
    "пакля",
    "папка",
    [
      LetterState.Guess,
      LetterState.Guess,
      LetterState.Miss,
      LetterState.WrongPosition,
      LetterState.Miss,
    ],
  ],
  [
    "шапка",
    "папка",
    [
      LetterState.Miss,
      LetterState.Guess,
      LetterState.Guess,
      LetterState.Guess,
      LetterState.Guess,
    ],
  ],
])("wordStatus(%s, %s) == %o", (word, guess, expected) => {
  expect(wordStatus(word, guess)).toStrictEqual(expected);
});

test("letterStat counts repeated letters", () => {
  // answer "пакля", guess "кабак"
  const stat = letterStat([
    [
      ["к", LetterState.WrongPosition],
      ["а", LetterState.Guess],
      ["б", LetterState.Miss],
      ["а", LetterState.WrongPosition],
      ["к", LetterState.Miss],
    ],
  ]);
  expect(stat.get("а")).toEqual(2);
  expect(stat.get("к")).toEqual(1);
  expect(stat.get("б")).toEqual(0);
});
