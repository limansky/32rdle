import { useState } from 'react';
import './App.css'
import { Boards } from './components/Boards';
import { Keyboard } from './components/Keyboard';
import { useDispatch } from 'react-redux';
import { addWord } from './app/wordsSlice';
import { Header } from './components/Header';
import dict from './data/dict.json';
import { MersenneTwister19937, Random } from 'random-js';

function genWords(ws: string[]): string[] {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const seed = date.getTime() / 1000;
  const random = new Random(MersenneTwister19937.seed(seed));
  var ids: number[] = [];
  while (ids.length < 32) {
    var next = random.integer(0, ws.length);
    if (!ids.includes(next)) ids.push(next);
  }
  console.log("got words " + ids);

  return ids.map(x => ws[x]);
}

function App() {

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [words, _setWords] = useState<Array<string>>(() => genWords(knownWords));

  function onButton(s: string) {
    if (input.length < 5) setInput(input + s);
  }

  function onEnter() {
    if (input.length < 5) setInput(""); else {
      if (knownWords.includes(input)) {
        dispatch(addWord(input));
      }
      setInput("");
      console.log("Enter " + input);
    }
  }

  function onBackspace() {
    if (input.length > 0) {
      setInput(input.substring(0, input.length - 1));
    }
  }

  return (
    <div className='game'>
      <Header />
      <Boards input={input} words={words}/>
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter}/>
    </div>
  );
}

export default App
