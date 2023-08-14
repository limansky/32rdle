import clsx from "clsx";
import "../styles/header.css"

type Props = {
  moves: number,
  ahead: number
}

export const GuessStatistics = ({ moves, ahead }: Props) => {
  const sign = ahead > 0 ? '+' : '';
  const style = clsx({
        ['good'] : ahead > 0,
        ['bad'] : ahead < 0
      });
  return <span className={style}>Ходы: {moves} / 37 ({sign}{ahead})</span>;
}
