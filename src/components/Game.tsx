import { useEffect, useMemo, useState } from 'react';
import '~/styles/game.css'
import { Boards } from './board/Boards';
import { Keyboard } from './Keyboard';
import dict from '../data/dict.json';
import { useWordsStore } from '../app/wordsStore';
import { Header } from './header/Header';
import { KeyState } from '../model/KeyState';
import { calcInputStates, letterStat, wordStatuses } from '../utils/words';
import { GameMode } from '../model/GameMode';
import { BoardState } from '../model/BoardState';
import { LetterState } from '../model/LetterState';
import { Results } from './results/Results';
import { InputState } from '../model/InputState';
import { useSettingsStore } from '../app/settingsStore';
import { genWords, seedForId } from '../utils/dictUtils';
import { globalKeyState, wordKeyState } from '../utils/keyUtils';

export function Game({ mode, dailyId }: { mode: GameMode, dailyId: number }) {

  const [input, setInput] = useState("");
  const { words, id, addWord, startDaily } = useWordsStore();

  const title = useMemo(() => "Ежедневное 32рдле #" + dailyId, [dailyId]);
  const seed = useMemo(() => seedForId(dailyId), [dailyId]);

  useEffect(() => {
    if (mode !== GameMode.Daily || id !== dailyId) {
      startDaily(dailyId);
    }
  }, [id, startDaily, mode, dailyId]);

  const knownWords: Array<string> = dict.map(x => x.toUpperCase());
  const [answer] = useState<Array<string>>(() => genWords(knownWords, seed));
  const [states, setStates] = useState<Array<BoardState>>(answer.map(a =>
    words.includes(a) ? BoardState.Solved : BoardState.Normal
  ));
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [inputStates, setInputStates] = useState<Array<Array<InputState>>>(Array(32).fill([]));

  const wordsWithStatuses: Array<Array<Array<[string, LetterState]>>> = useMemo(() => wordStatuses(answer, words), [answer, words]);
  const letterStats: Array<Map<string, number>> = useMemo(() => wordsWithStatuses.map(wss => letterStat(wss)), [wordsWithStatuses]);
  const keyState: Map<string, KeyState> = selected !== undefined ?
    wordKeyState(wordsWithStatuses[selected]) :
    globalKeyState(answer, words, states);

  const { tillTheEnd } = useSettingsStore();

  const done = useMemo(() =>(!tillTheEnd && words.length >= 37) || states.every(x => x == BoardState.Solved), [tillTheEnd, words, states]);
  const is = inputStates.map(states => states.length > 0 ? states[states.length - 1] : InputState.Match);

  function removeInputState() {
    setInputStates(inputStates => inputStates.map(is => is.slice(0, -1)));
  }

  function onButton(s: string) {
    if (input.length < 5) {
      const newInput = input + s;
      setInput(newInput);
      setInputStates(is => calcInputStates(knownWords, is, wordsWithStatuses, states, letterStats, newInput));
    }
  }

  function onEnter() {
    if (input.length == 5) {
      if (knownWords.includes(input)) {
        addWord(input);
        const guess = answer.indexOf(input);
        if (guess !== -1) {
          const ns = [...states];
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
    }

    setInput("");
    setInputStates(Array(32).fill([]));
  }

  function onBackspace() {
    if (input.length > 0) {
      setInput(input.substring(0, input.length - 1));
      removeInputState();
    }
  }

  function onWordSelected(word: string) {
    if (!done) {
      const ns = [...states];
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
        done={done}
        onWordSelected={onWordSelected}
      />
      {!done ?
        <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter} keyState={keyState} /> :
        <Results gameTitle={title} answer={answer} words={words} />
      }
    </div>
  );
}

