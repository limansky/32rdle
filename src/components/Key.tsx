import clsx from "clsx";
import "~/styles/keyboard.css";
import { KeyState } from "../model/KeyState";

export function Key(letter: string, handler: (l: string) => void, state: KeyState) {
  function handleClick(_e: React.MouseEvent<HTMLButtonElement>) {
    handler(letter);
  }

  const cn = clsx('keyboard-key', {
    'absent' : state === KeyState.Absent
  });

  return <button type='button' className={cn} key={'key-' + letter} onClick={handleClick}>{letter}</button>;
}
