import { useEffect, useState } from "react";
import { Letter } from "./Letter";
import "../styles/boards.css";
import { InputLetter } from "./InputLetter";
import { useAppSelector } from "../app/hooks";
import { wordsSelector } from "../app/wordsSlice";
import clsx from "clsx";
import { wordStatus } from "../utils/words";

export enum BoardState {
  Normal,
  Selected,
  Solved
}

function letters(word: string, answer: string): Array<JSX.Element> {
  return wordStatus(word, answer).map((s, i) => Letter(answer[i], s));
}

function boardStateClass(state: BoardState) {
  switch (state) {
    case BoardState.Normal: return "";
    case BoardState.Selected: return "selected";
    case BoardState.Solved: return "solved";
  }
}

function inputArea(input: String): Array<JSX.Element> {
  var result = Array.from(input).map(c => InputLetter(c));
  while (result.length < 5) {
    result.push(InputLetter(""));
  }
  return result;
}

export function Board(word: string, input: string) {

  const [state, setState] = useState(BoardState.Normal);

  function onClick(_e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (state === BoardState.Normal) setState(BoardState.Selected);
    else if (state == BoardState.Selected) setState(BoardState.Normal);
  }

  const [words, setWords] = useState(Array<string>);
  const opened = words.map(w => letters(w, word));
  const knownWords = useAppSelector(wordsSelector);
  useEffect(() => {
    setWords(knownWords);
    if (knownWords.includes(word)) setState(BoardState.Solved);
  }, [knownWords]);
  const inputLetters: Array<JSX.Element> = words[words.length - 1] != word ? inputArea(input) : [];
  return <div className={clsx('board', boardStateClass(state))} onClick={onClick}>
    {...opened}
    {...inputLetters}
  </div>;
}
