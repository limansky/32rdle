import { BoardState } from "../../model/BoardState";
import { Board } from "./Board";
import "~/styles/boards.css";

export function Boards({input, answer, words, states, onWordSelected}: {
      input: string,
      answer: string[],
      words: string[],
      states: BoardState[],
      onWordSelected?: (word: string) => void
  }) {

  const boards = answer.map((w, i) =>
    <Board word={w} words={words} input={input} state={states[i]} key={w} handleClick={onWordSelected}/>
  );

  return <div className='boards'>
      {...boards}
    </div>;
}
