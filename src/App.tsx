import { useState } from 'react';
import './App.css'
import { Boards } from './components/Boards';
import { Keyboard } from './components/Keyboard';
import { Header } from './components/Header';
import dict from './data/dict.json';
import { MersenneTwister19937, Random } from 'random-js';
import { useWordsStore } from './app/wordsStore';

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
  const { addWord, words } = useWordsStore();

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [answer, _setAnswer] = useState<Array<string>>(() => genWords(knownWords));
  const boards = Array(32).fill(false);

  function onButton(s: string) {
    if (input.length < 5) setInput(input + s);
  }

  function onEnter() {
    if (input.length < 5) setInput(""); else {
      if (knownWords.includes(input)) {
        addWord(input);
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
      <Header moves={words.length} boards={boards}/>
      <Boards input={input} words={answer}/>
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter}/>
    </div>
  );
}

export default App
