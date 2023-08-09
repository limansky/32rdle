import { expect, test } from 'vitest';
import { wordStatus } from './words';
import { LetterState } from '../components/Letter';

test.each([
  ['пакля', 'кабак', [LetterState.Miss, LetterState.Guess, LetterState.WrongPosition, LetterState.Miss, LetterState.Miss]],
  ['кабак', 'папка', [LetterState.Miss, LetterState.Guess, LetterState.Miss, LetterState.WrongPosition, LetterState.WrongPosition]],
  ['пакля', 'папка', [LetterState.Guess, LetterState.Guess, LetterState.Miss, LetterState.WrongPosition, LetterState.Miss]]
])('wordStatus(%s, %s) == %o', (word, guess, expected) => {
  expect(wordStatus(word, guess)).toStrictEqual(expected);
});
