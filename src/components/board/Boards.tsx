import { BoardState } from "../../model/BoardState";
import { Board } from "./Board";
import "~/styles/boards.css";

export function Boards({input, words, states, onWordSelected}: {
      input: string,
      words: string[],
      states: BoardState[],
      onWordSelected?: (word: string) => void
  }) {

  const boards = words.map((w, i) =>
    <Board word={w} input={input} state={states[i]} key={w} handleClick={onWordSelected}/>
  );

  return <div className='boards'>
      {...boards}
    </div>;
}
