import clsx from "clsx";
import "~/styles/keyboard.css";
import { KeyState } from "../model/KeyState";

export function Key(
  letter: string,
  handler: (l: string) => void,
  state: KeyState,
) {
  function handleClick() {
    handler(letter);
  }

  const cn = clsx("keyboard-key", {
    absent: state === KeyState.Absent,
    known: state === KeyState.Known,
    "wrong-position": state === KeyState.WrongPosition,
    guess: state === KeyState.Guess,
    special: state === KeyState.Special,
  });

  return (
    <button
      type="button"
      className={cn}
      key={"key-" + letter}
      onClick={handleClick}
    >
      {letter}
    </button>
  );
}
