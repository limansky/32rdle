import { Board } from "./Board";
import "../styles/boards.css";

export function Boards() {
  const words = [
    'понос', 'насос', 'ветер', 'кусок',
    'дверь', 'пакля', 'штраф', 'вызов',
    'въезд', 'кулек', 'тренд', 'столб',
    'балет', 'палец', 'мысль', 'пойло',
    'месть', 'спесь', 'мюсли', 'багет',
    'удаль', 'марка', 'щетка', 'лютня',
    'чушка', 'шакал', 'жердь', 'брага',
    'чувак', 'тромб', 'кухня', 'цапля'
  ];

  const boards = words.map(w => Board(w))

  return <div className='boards'>
      {...boards}
    </div>;
}
