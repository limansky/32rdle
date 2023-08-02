import { Board } from "./Board";
import "../styles/boards.css";

export function Boards({input}: {
      input: string
  }) {
  const words = [
    'ПОНОС', 'НАСОС', 'ВЕТЕР', 'КУСОК',
    'ДВЕРЬ', 'ПАКЛЯ', 'ШТРАФ', 'ВЫЗОВ',
    'ВЪЕЗД', 'КУЛЕК', 'ТРЕНД', 'СТОЛБ',
    'БАЛЕТ', 'ПАЛЕЦ', 'МЫСЛЬ', 'ПОЙЛО',
    'МЕСТЬ', 'СПЕСЬ', 'МЮСЛИ', 'БАГЕТ',
    'УДАЛЬ', 'МАРКА', 'ЩЕТКА', 'ЛЮТНЯ',
    'ЧУШКА', 'ШАКАЛ', 'ЖЕРДЬ', 'БРАГА',
    'ЧУВАК', 'ТРОМБ', 'КУХНЯ', 'ЦАПЛЯ'
  ];

  const boards = words.map(w => Board(w, input))

  return <div className='boards'>
      {...boards}
    </div>;
}
