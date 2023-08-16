import "~/styles/boards.css";

import clsx from "clsx";
import { LetterState } from "../../model/LetterState";

function letterStateClass(state: LetterState) {
  switch (state) {
    case LetterState.Guess: return "guess";
    case LetterState.Miss: return "miss";
    case LetterState.WrongPosition: return "wrong-position";
  }
}

export function Letter(letter: String, state: LetterState) {
  return <div className={clsx("letter", letterStateClass(state))}>
    <span className='letter-itself'>{letter}</span>
  </div>;
}
