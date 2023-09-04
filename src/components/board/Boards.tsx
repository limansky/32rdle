import { BoardState } from "../../model/BoardState";
import { InputState } from "../../model/InputState";
import { LetterState } from "../../model/LetterState";
import { Board } from "./Board";
import "~/styles/boards.css";

export function Boards({ input, answer, words, states, inputStates, onWordSelected }: {
  input: string,
  answer: string[],
  words: Array<Array<Array<[string, LetterState]>>>,
  states: BoardState[],
  inputStates: InputState[],
  onWordSelected?: (word: string) => void
}) {

  const boards = answer.map((w, i) =>
    <Board
      word={w}
      words={words[i]}
      input={input}
      state={states[i]}
      inputState={inputStates[i]}
      key={w}
      handleClick={onWordSelected}
    />
  );

  return <div className='boards'>
    {...boards}
  </div>;
}
