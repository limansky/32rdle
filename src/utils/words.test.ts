import { expect, test } from 'vitest';
import { idForDate, wordStatus } from './words';
import { LetterState } from '../model/LetterState';

test.each([
  ['пакля', 'кабак', [LetterState.WrongPosition, LetterState.Guess, LetterState.Miss, LetterState.Miss, LetterState.Miss]],
  ['кабак', 'пакля', [LetterState.Miss, LetterState.Guess, LetterState.WrongPosition, LetterState.Miss, LetterState.Miss]],
  ['кабак', 'папка', [LetterState.Miss, LetterState.Guess, LetterState.Miss, LetterState.WrongPosition, LetterState.WrongPosition]],
  ['пакля', 'папка', [LetterState.Guess, LetterState.Guess, LetterState.Miss, LetterState.WrongPosition, LetterState.Miss]],
  ['шапка', 'папка', [LetterState.Miss, LetterState.Guess, LetterState.Guess, LetterState.Guess, LetterState.Guess]]
])('wordStatus(%s, %s) == %o', (word, guess, expected) => {
  expect(wordStatus(word, guess)).toStrictEqual(expected);
});

test("Game id for date", () => {
  expect(idForDate(new Date(2023, 7, 15))).toEqual(1);
  expect(idForDate(new Date(2023, 8, 20))).toEqual(6 + 31);
});
