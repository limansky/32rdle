import { useState } from 'react';
import '~/styles/game.css'
import { Boards } from './board/Boards';
import { Keyboard } from './Keyboard';
import dict from '../data/dict.json';
import { useWordsStore } from '../app/wordsStore';
import { Header } from './header/Header';
import { KeyState }  from '../model/KeyState';
import { genWords, seedForId } from '../utils/words';
import { GameMode } from '../model/GameMode';


const ALFABET = [ 'А','Б','В','Г','Д','Е','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];

export function Game({mode, dailyId}: {mode: GameMode, dailyId: number}) {

  const [input, setInput] = useState("");
  const { words, id, addWord, startDaily } = useWordsStore();

  const seed = seedForId(dailyId);

  if (mode !== GameMode.Daily || id !== dailyId) {
    startDaily(dailyId);
  }

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [answer] = useState<Array<string>>(() => genWords(knownWords, seed));
  const [guesses, setGuesses] = useState(answer.map(a => words.includes(a)));

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
      <Header moves={words.length} boards={guesses} title={'Ежедневное 32rdle #' + dailyId}/>
      <Boards input={input} words={answer}/>
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter} keyState={keyState} />
    </div>
  );
}

