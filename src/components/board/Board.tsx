import { useMemo } from "react";
import { Letter } from "./Letter";
import { InputLetter } from "./InputLetter";
import clsx from "clsx";
import { BoardState } from "../../model/BoardState";

import "~/styles/boards.css";
import { LetterState } from "../../model/LetterState";
import { InputState } from "../../model/InputState";
import { useSettingsStore } from "../../app/settingsStore";

interface Props {
  word: string;
  words: Array<Array<[string, LetterState]>>;
  input: string;
  state: BoardState;
  inputState: InputState;
  handleClick?: (word: string) => void;
}

export const Board = ({
  word,
  words,
  input,
  state,
  inputState,
  handleClick,
}: Props) => {
  function letters(
    guess: Array<[string, LetterState]>,
    gs: boolean[]
  ): [Array<JSX.Element>, Array<boolean>] {
    const r = guess.map((x, i) => {
      const [l, s] = x;
      gs[i] ||= s === LetterState.Guess;
      return <Letter letter={l} state={s} key={i} />;
    });

    return [r, gs];
  }

  function onClick() {
    handleClick?.(word);
  }

  let ng = Array(5).fill(false);
  const opened: Array<Array<JSX.Element>> = words.map((word) => {
    const [l, g] = letters(word, ng);
    ng = g;
    return l;
  });

  const { hideSolved } = useSettingsStore();

  const inputLetters: Array<JSX.Element> = useMemo(() => {
    function inputArea(input: string, g: boolean[]): Array<JSX.Element> {
      const result = Array<JSX.Element>();

      for (let i = 0; i < input.length; i++) {
        result.push(
          <InputLetter
            letter={input[i]}
            preview={g[i] ? word[i] : ""}
            state={inputState}
          />
        );
      }

      for (let i = input.length; i < 5; i++) {
        result.push(
          <InputLetter preview={g[i] ? word[i] : ""} state={inputState} />
        );
      }
      return result;
    }

    return state != BoardState.Solved ? inputArea(input, ng) : [];
  }, [input, ng, state, inputState, word]);

  return (
    <div
      className={clsx("board", {
        selected: state === BoardState.Selected,
        solved: state === BoardState.Solved,
        hidden: hideSolved && state === BoardState.Solved,
      })}
      onClick={onClick}
    >
      {...opened}
      {...inputLetters}
    </div>
  );
};
