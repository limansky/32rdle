import { Letter } from "./Letter";
import { InputLetter } from "./InputLetter";
import clsx from "clsx";
import { BoardState } from "../../model/BoardState";

import "~/styles/boards.css";
import { LetterState } from "../../model/LetterState";
import { InputState } from "../../model/InputState";

interface Props {
  word: string,
  words: Array<Array<[string, LetterState]>>,
  input: string,
  state: BoardState,
  inputState: InputState,
  handleClick?: (word: string) => void
}

export const Board = ({word, words, input, state, inputState, handleClick}: Props) => {

  function letters(guess: Array<[string, LetterState]>, gs: boolean[]): [Array<JSX.Element>, Array<boolean>] {
    const r = Array<JSX.Element>();

    guess.forEach((x, i) => {
      const [l, s] = x;
      gs[i] ||= s === LetterState.Guess;
      r.push(<Letter letter={l} state={s} key={i}/>);
    });

    return [r, gs];
  }

  function inputArea(input: String, g: boolean[]): Array<JSX.Element> {
    let result = Array<JSX.Element>();

    for (let i = 0; i < input.length; i++) {
      result.push(<InputLetter letter={input[i]} preview={g[i] ? word[i] : ''} state={inputState} />);
    }

    for (let i = input.length; i < 5; i++) {
      result.push(<InputLetter preview={g[i] ? word[i] : ''} state={inputState} />);
    }
    return result;
  }


  function onClick(_e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    handleClick?.(word);
  }

  const opened: Array<Array<JSX.Element>> = [];

  let ng = Array(5).fill(false);
  for (let i = 0; i < words.length; i++) {
    let [l, g] = letters(words[i], ng);
    ng = g;
    opened.push(l);
  }


  const inputLetters: Array<JSX.Element> = state != BoardState.Solved ? inputArea(input, ng) : [];
  return <div className={clsx('board', {
    'selected': state === BoardState.Selected,
    'solved': state === BoardState.Solved
  })} onClick={onClick}>
    {...opened}
    {...inputLetters}
  </div>;
}
