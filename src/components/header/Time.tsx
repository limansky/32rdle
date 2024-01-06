import { formatTime } from "../../utils/time";

type TimeProps = {
  time: number
}

export const Time = ({time}: TimeProps) => {
  return <span>Прошло: {formatTime(time)}</span>;
}
