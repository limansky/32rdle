import '../styles/header.css';
import { BoardsStatistics } from './BoardsStatistics';
import { GuessIndicator } from './GuessIndicator';
import { GuessStatistics } from './GuessStatistics';

type HeaderStats = {
  moves: number,
  boards: Array<boolean>
}

export const Header = ({moves, boards}: HeaderStats) => {
  const solved = boards.reduce((a: number, b: boolean) => { if (b) return a + 1; else return a; }, 0);
  return <div className="header">
    <div className="row1">
      <span className="header-title">Это 32rdle</span>
    </div>
    <div className="row2">
      <BoardsStatistics solved={solved} />
      <span className="filler" />
      <GuessStatistics moves={moves} ahead={5 - moves + solved}/>
    </div>
    <div className="row3">
      <GuessIndicator boards={boards} />
    </div>
  </div>;
}
