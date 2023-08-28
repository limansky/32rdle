import { useState } from 'react';
import '~/styles/game.css'
import { Boards } from './board/Boards';
import { Keyboard } from './Keyboard';
import dict from '../data/dict.json';
import { useWordsStore } from '../app/wordsStore';
import { Header } from './header/Header';
import { KeyState } from '../model/KeyState';
import { genWords, seedForId, wordStatus } from '../utils/words';
import { GameMode } from '../model/GameMode';
import { BoardState } from '../model/BoardState';
import { LetterState } from '../model/LetterState';


const ALFABET = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

export function Game({ mode, dailyId }: { mode: GameMode, dailyId: number }) {

  const [input, setInput] = useState("");
  const { words, id, addWord, startDaily } = useWordsStore();

  const seed = seedForId(dailyId);

  if (mode !== GameMode.Daily || id !== dailyId) {
    startDaily(dailyId);
  }

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [answer] = useState<Array<string>>(() => genWords(knownWords, seed));
  const [states, setStates] = useState<Array<BoardState>>(answer.map(a =>
    words.includes(a) ? BoardState.Solved : BoardState.Normal
  ));
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const knownLetters = new Set(words.flatMap(x => [...x]));

  let keyState: Map<string, KeyState>;

  if (selected !== undefined) {
    keyState = new Map(ALFABET.map(l => [l, KeyState.Unknown]));
    for (let w of words) {
      const statuses = wordStatus(answer[selected], w);
      statuses.forEach((s, i) => {
        const newState = s == LetterState.Guess ? KeyState.Guess : s == LetterState.WrongPosition ? KeyState.WrongPosition : KeyState.Absent;
        if ((keyState.get(w[i]) ?? KeyState.Unknown) < newState) {
          keyState.set(w[i], newState);
        }
      })
    }

  } else {
    const allLetters = new Set(answer.flatMap((x, i) => states[i] !== BoardState.Solved ? [...x] : []));
    keyState = new Map(ALFABET.map(l => [l, knownLetters.has(l) && !allLetters.has(l) ? KeyState.Absent : KeyState.Unknown]));
  }

  function onButton(s: string) {
    if (input.length < 5) setInput(input + s);
  }

  function onEnter() {
    if (input.length < 5) setInput(""); else {
      if (knownWords.includes(input)) {
        addWord(input);
        const guess = answer.indexOf(input);
        if (guess !== -1) {
          let ns = [...states];
          if (ns[guess] == BoardState.Selected) {
            let next = (guess + 1) % 32;
            while (ns[next] === BoardState.Solved && next != guess) {
              next = (next + 1) % 32;
            }
            if (next != guess) {
              ns[next] = BoardState.Selected;
              setSelected(next);
            }
          }
          ns[guess] = BoardState.Solved;
          setStates(ns);
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

  function onWordSelected(word: string) {
    let ns = [...states];
    if (selected !== undefined) {
      ns[selected] = BoardState.Normal;
    }
    const idx = answer.indexOf(word);
    if (idx !== -1 && idx !== selected && ns[idx] === BoardState.Normal) {
      ns[idx] = BoardState.Selected;
      setSelected(idx);
    } else {
      setSelected(undefined);
    }
    setStates(ns);
  }

  return (
    <div className='game'>
      <Header moves={words.length} boards={states} title={'Ежедневное 32rdle #' + dailyId} />
      <Boards input={input} words={answer} states={states} onWordSelected={onWordSelected} />
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter} keyState={keyState} />
    </div>
  );
}

