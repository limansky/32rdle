import '~/styles/header.css';
import { BoardsStatistics } from './BoardsStatistics';
import { GuessIndicator } from './GuessIndicator';
import { GuessStatistics } from './GuessStatistics';
import { Link } from 'wouter';
import backUrl from '../../img/back.svg';
import { BoardState } from '../../model/BoardState';
import { SettingsDialog } from '../settings/SettingsDialog';
import { useState } from 'react';

type HeaderStats = {
  title: string,
  moves: number,
  boards: Array<BoardState>
}

export const Header = ({title, moves, boards}: HeaderStats) => {
  const [settingsShown, setSettingsShown] = useState(false);

  const solved = boards.reduce((a: number, b: BoardState) => { if (b === BoardState.Solved) return a + 1; else return a; }, 0);
  return <div className="header">
    <div className="row1">
      <Link to="/"><img src={backUrl} /></Link>
      <span className="header-title">{title}</span>
      <button className='header-button' onClick={() => setSettingsShown(true)}>&#9881;</button>
    </div>
    <div className="row2">
      <BoardsStatistics solved={solved} />
      <span className="filler" />
      <GuessStatistics moves={moves} ahead={5 - moves + solved}/>
    </div>
    <div className="row3">
      <GuessIndicator boards={boards} />
    </div>
    <SettingsDialog isOpen={settingsShown} onClose={() => setSettingsShown(false)}/>
  </div>;
}
