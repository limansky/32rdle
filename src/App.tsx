import { useState } from 'react';
import './App.css'
import { Boards } from './components/board/Boards';
import { Keyboard } from './components/Keyboard';
import dict from './data/dict.json';
import { MersenneTwister19937, Random } from 'random-js';
import { useWordsStore } from './app/wordsStore';
import { Header } from './components/header/Header';
import { KeyState }  from './model/KeyState';

function genWords(ws: string[]): string[] {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const seed = date.getTime() / 1000;
  const random = new Random(MersenneTwister19937.seed(seed));
  var ids: number[] = [];
  while (ids.length < 32) {
    var next = random.integer(0, ws.length);
    if (!ids.includes(next)) ids.push(next);
  }

  return ids.map(x => ws[x]);
}

const ALFABET = [ 'А','Б','В','Г','Д','Е','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];

function App() {

  const [input, setInput] = useState("");
  const { addWord, words } = useWordsStore();

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [answer] = useState<Array<string>>(() => genWords(knownWords));
  const [guesses, setGuesses] = useState(Array(32).fill(false));

  const allLetters = new Set(answer.flatMap((x, i) => !guesses[i] ? [...x] : []));
  const knownLetters = new Set(words.flatMap(x => [...x]));

  const keyState = new Map(ALFABET.map(l => [l, knownLetters.has(l) && !allLetters.has(l) ? KeyState.Absent : KeyState.Unknown]));

  function onButton(s: string) {
    if (input.length < 5) setInput(input + s);
  }

  function onEnter() {
    if (input.length < 5) setInput(""); else {
      if (knownWords.includes(input)) {
        addWord(input);
        const guess = answer.indexOf(input);
        if (guess !== -1) {
          let ng = [...guesses];
          ng[guess] = true;
          setGuesses(ng);
        }
      }
      setInput("");
    }
  }

  function onBackspace() {
    if (input.length > 0) {
      setInput(input.substring(0, input.length - 1));
    }
  }

  return (
    <div className='game'>
      <Header moves={words.length} boards={guesses}/>
      <Boards input={input} words={answer}/>
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter} keyState={keyState} />
    </div>
  );
}

export default App
