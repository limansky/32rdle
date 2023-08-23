import clsx from "clsx";
import '~/styles/header.css';

type Props = {
  boards: Array<boolean>
}

export const GuessIndicator = ({boards}: Props) => {
  return boards.map((g, i) => <button className={clsx('guess-indicator-button', { 'done' : g })}>{i + 1}</button>);
}
