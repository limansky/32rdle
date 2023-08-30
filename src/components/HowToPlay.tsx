import { SimpleHeader } from './header/SimpleHeader';
import '~/styles/howtoplay.css';

export function HowToPlay() {
  return <>
    <SimpleHeader title="Правила игры" />
    <div className="how-to-play">
      <p>Компьютер загадывает 32 существительных из 5 букв. Ваша задача отгадать все слова
        за минимальное количество ходов.  Для этого вы вводите существующие существительные из 5 букв. После ввода
        очередного слова для каждого из загаданных слов показывается на сколько ваше слово близко к загаданному.
      </p>
      <p>
        Зеленым цветом показываются те буквы, которые есть в загаданном слове и стоят на своём месте.
        Желтым показываются буквы которые также есть в загаданном слове, но находятся в другой месте.
      </p>
    </div>
  </>;
}
