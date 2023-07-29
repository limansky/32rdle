import { useState } from "react";
import { Letter, LetterState } from "./Letter";
import "../styles/boards.css";

function letters(word: String): Array<JSX.Element> {
  return Array.from(word).map(c => Letter(c, LetterState.Miss))
}

export function Board(word: String) {
  const [words, _setWords] = useState(Array<String>);
  const opened = words.map(w => letters(w));
  const input: Array<JSX.Element> = words[words.length - 1] != word ? [] : [];
  return <div className='board'>
    {...opened}
    {...input}
  </div>;
}
