import clsx from "clsx";
import { InputState } from "../../model/InputState";
import "~/styles/boards.css";

export function InputLetter({letter, preview, state}: {letter?: string, preview: string, state: InputState}) {
  const l = letter !== '' ? <span className={clsx(
    'letter-itself', {
      'unmatch' : state === InputState.Unmatch,
      'invalid' : state === InputState.Invalid
    }
  )}>{letter}</span> :
                            <span className='letter-preview'>{preview}</span>;
    return <div className={"letter input-letter"}>{l}</div>;
}
