import '~/styles/results.css';
import { Answer } from './Answer';
import { ResultsShare } from './ResultsShare';
import clsx from 'clsx';

export function Results({gameTitle, answer, words}: {
  gameTitle: string,
  answer: Array<string>,
  words: Array<string>
}) {
  const gameStats = '';
  const guesses = answer.map(a => words.indexOf(a) + 1);
  const isWin = guesses.find(n => n == 0 || n > 37) === undefined;
  const title = isWin ? "🎉 Вы выиграли! 🎉" : 'Вы проиграли 😓';

  return <div className={clsx('results', {'win' : isWin, 'lost' : !isWin}) }>
    <p className='results-title'>{title}</p>
    <p className='results-subtitle'>{gameStats}</p>
    <div className='result-details'>
      <ResultsShare title={gameTitle} guesses={guesses}/>
      <Answer answer={answer} />
    </div>
  </div>;
}
