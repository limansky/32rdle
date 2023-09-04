import { useState } from 'react';
import '~/styles/game.css'
import { Boards } from './board/Boards';
import { Keyboard } from './Keyboard';
import dict from '../data/dict.json';
import { useWordsStore } from '../app/wordsStore';
import { Header } from './header/Header';
import { KeyState } from '../model/KeyState';
import { genWords, seedForId, wordStatus, wordStatuses } from '../utils/words';
import { GameMode } from '../model/GameMode';
import { BoardState } from '../model/BoardState';
import { LetterState } from '../model/LetterState';
import { Results } from './results/Results';
import { InputState } from '../model/InputState';


const ALPHABET = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

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
  const [inputStates, setInputStates] = useState<Array<Array<InputState>>>(Array(32).fill([]));

  const knownLetters = new Set(words.flatMap(x => [...x]));
  const wordsWithStatuses: Array<Array<Array<[string, LetterState]>>> = wordStatuses(answer, words);

  let keyState: Map<string, KeyState>;

  if (selected !== undefined) {
    keyState = new Map(ALPHABET.map(l => [l, KeyState.Unknown]));
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
    keyState = new Map(ALPHABET.map(l => [l, knownLetters.has(l) && !allLetters.has(l) ? KeyState.Absent : KeyState.Unknown]));
  }

  const title = 'Ежедневное 32рдле #' + dailyId;
  const done = words.length > 37 || states.every(x => x == BoardState.Solved);
  const is = inputStates.map(states => states.length > 0 ? states[states.length - 1] : InputState.Match);


  function addInputState(s: InputState) {
    const nss = inputStates.map(is => [...is, s]);
    setInputStates(nss);
  }

  function removeInputState() {
    if (inputStates[0].length > 0) {
      const nss = inputStates.map(is => is.slice(0, -1));
      setInputStates(nss);
    }
  }

  function onButton(s: string) {
    if (input.length < 5) {
      const newInput = input + s;
      setInput(newInput);
      if (newInput.length == 5 && !knownWords.includes(newInput)) {
        addInputState(InputState.Invalid);
      } else {
        const newsStates = inputStates.map((bis, bid) => {
          const [lastState] = bis.slice(-1);
          if (lastState === undefined || lastState === InputState.Match) {
            let newState = InputState.Match;
            for (let ws of wordsWithStatuses[bid]) {
              const [l, st] =  ws[input.length];
              if (l === s) {
                if (st !== LetterState.Guess) newState = InputState.Unmatch;
                break;
              }
            }
            return [...bis, newState];
          } else return [...bis, lastState];
        });
        setInputStates(newsStates);
      }
    }
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
      setInputStates(Array(32).fill([]));
    }
  }

  function onBackspace() {
    if (input.length > 0) {
      setInput(input.substring(0, input.length - 1));
      removeInputState();
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
      <Header moves={words.length} boards={states} title={title} />
      <Boards
        input={input}
        answer={answer}
        words={wordsWithStatuses}
        states={states}
        inputStates={is}
        onWordSelected={onWordSelected}
      />
      {!done ?
        <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter} keyState={keyState} /> :
        <Results gameTitle={title} answer={answer} words={words} />
      }
    </div>
  );
}

