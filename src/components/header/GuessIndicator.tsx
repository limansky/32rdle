import clsx from "clsx";
import "~/styles/header.css";
import { BoardState } from "../../model/BoardState";

type Props = {
  boards: Array<BoardState>;
};

export const GuessIndicator = ({ boards }: Props) => {
  return boards.map((g, i) => (
    <button
      className={clsx("guess-indicator-button", {
        done: g === BoardState.Solved,
        current: g === BoardState.Selected,
      })}
      key={i}
    >
      {i + 1}
    </button>
  ));
};
