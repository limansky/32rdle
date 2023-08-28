import { Letter } from "./Letter";
import { InputLetter } from "./InputLetter";
import clsx from "clsx";
import { wordStatus } from "../../utils/words";
import { useWordsStore } from "../../app/wordsStore";
import { BoardState } from "../../model/BoardState";

import "~/styles/boards.css";
import { LetterState } from "../../model/LetterState";

interface Props {
  word: string,
  input: string,
  state: BoardState,
  handleClick?: (word: string) => void
}

export const Board = ({word, input, state, handleClick}: Props) => {

  function letters(guess: string, answer: string, gs: boolean[]): [Array<JSX.Element>, Array<boolean>] {
    const r = Array<JSX.Element>();

    wordStatus(answer, guess).forEach((s, i) => {
      gs[i] ||= s == LetterState.Guess;
      r.push(<Letter letter={guess[i]} state={s} key={i}/>);
    });

    return [r, gs];
  }

  function inputArea(input: String, g: boolean[]): Array<JSX.Element> {
    let result = Array<JSX.Element>();

    for (let i = 0; i < input.length; i++) {
      result.push(InputLetter(input[i], g[i] ? word[i] : ''));
    }

    for (let i = input.length; i < 5; i++) {
      result.push(InputLetter("", g[i] ? word[i] : ''));
    }
    return result;
  }


  function onClick(_e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    handleClick?.(word);
  }

  const opened: Array<Array<JSX.Element>> = [];
  const { words } = useWordsStore();

  let ng = Array(5).fill(false);
  for (let i = 0; i < words.length; i++) {
    let [l, g] = letters(words[i], word, ng);
    ng = g;
    opened.push(l);
    if (words[i] == word) break;
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
