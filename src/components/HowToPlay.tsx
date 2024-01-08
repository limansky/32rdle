import { BoardState } from '../model/BoardState';
import { wordStatuses } from '../utils/words';
import { Boards } from './board/Boards';
import { SimpleHeader } from './header/SimpleHeader';
import '~/styles/howtoplay.css';

export function HowToPlay() {
  const answer = ["СОСЕД", "ЛОЖКА", "ЧЕПЕЦ", "БЛЮДО"];
  const words = ['БИЗОН', 'ОСЕНЬ', 'ДОСКА'];
  const statuses = wordStatuses(answer, words)
  return <>
    <SimpleHeader title="Правила игры" />
    <div className="how-to-play">
      <p>Компьютер загадывает 32 существительных из 5 букв. Ваша задача отгадать все слова
        за минимальное количество ходов.  Для этого вы вводите существующие существительные из 5 букв. После ввода
        очередного слова для каждого из загаданных слов показывается на сколько ваше слово близко к загаданному.
        Каждое введенное слово отображается на каждой доске.
        Предположим, были загаданы слова "сосед", "ложка", "чепец" и "блюдо".  Вы сделали три попытки и ввели слова
        "бизон", "осень" и "доска":
      </p>
      <div>
         <Boards
           answer={answer}
           words={statuses}
           states={[BoardState.Normal, BoardState.Normal, BoardState.Normal, BoardState.Normal]}
           input=""
           done={false}
           inputStates={[]}/>
      </div>
      <p>
        Зеленым цветом показываются те буквы, которые есть в загаданном слове и стоят на своём месте.
        Желтым показываются буквы, которые также есть в загаданном слове, но находятся в другой месте.
      </p>
    </div>
  </>;
}

