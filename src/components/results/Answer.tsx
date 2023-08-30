import '~/styles/results.css';

export function Answer({answer}: {answer: Array<string>}) {

  const words = answer.map(w => <button className='answer' key={w}>{w}</button>);

  return <div className='answer-board'>
    {...words}
  </div>
}
