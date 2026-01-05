import "~/styles/boards.css";

import clsx from "clsx";
import { LetterState } from "../../model/LetterState";

export function Letter({
  letter,
  state,
}: {
  letter: string;
  state: LetterState;
}) {
  return (
    <div
      className={clsx("letter", {
        guess: state === LetterState.Guess,
        miss: state === LetterState.Miss,
        "wrong-position": state === LetterState.WrongPosition,
      })}
    >
      <span className="letter-itself">{letter}</span>
    </div>
  );
}
