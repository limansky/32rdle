import { useEffect, useMemo, useState } from "react";
import "~/styles/game.css";
import { useSettingsStore } from "../app/settingsStore";
import { useWordsStore } from "../app/wordsStore";
import dict from "../data/dict.json";
import { BoardState } from "../model/BoardState";
import { GameMode } from "../model/GameMode";
import { InputState } from "../model/InputState";
import { KeyState } from "../model/KeyState";
import { LetterState } from "../model/LetterState";
import { genWords, seedForId } from "../utils/dictUtils";
import { globalKeyState, wordKeyState } from "../utils/keyUtils";
import { calcInputStates, letterStat, wordStatuses } from "../utils/words";
import { Boards } from "./board/Boards";
import { Header } from "./header/Header";
import { Keyboard } from "./Keyboard";
import { Results } from "./results/Results";

const knownWords: Array<string> = dict.map((x) => x.toUpperCase());
const NO_WORDS: Array<string> = [];

export function Game({ mode, dailyId }: { mode: GameMode; dailyId: number }) {
  const [input, setInput] = useState("");
  const {
    words: storedWords,
    id,
    mode: storedMode,
    addWord,
    startDaily,
  } = useWordsStore();

  const title = useMemo(() => "Ежедневное 32рдле #" + dailyId, [dailyId]);
  const seed = useMemo(() => seedForId(dailyId), [dailyId]);

  const isCurrentGame = storedMode === mode && id === dailyId;
  // Persisted words may belong to another game until startDaily is applied
  const words = isCurrentGame ? storedWords : NO_WORDS;

  useEffect(() => {
    if (!isCurrentGame) {
      startDaily(dailyId);
    }
  }, [isCurrentGame, startDaily, dailyId]);

  const answer = useMemo(() => genWords(knownWords, seed), [seed]);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const states: Array<BoardState> = useMemo(
    () =>
      answer.map((a, i) =>
        words.includes(a)
          ? BoardState.Solved
          : i === selected
            ? BoardState.Selected
            : BoardState.Normal,
      ),
    [answer, words, selected],
  );
  const [inputStates, setInputStates] = useState<Array<Array<InputState>>>(
    Array(32).fill([]),
  );

  const wordsWithStatuses: Array<Array<Array<[string, LetterState]>>> = useMemo(
    () => wordStatuses(answer, words),
    [answer, words],
  );
  const letterStats: Array<Map<string, number>> = useMemo(
    () => wordsWithStatuses.map((wss) => letterStat(wss)),
    [wordsWithStatuses],
  );
  const keyState: Map<string, KeyState> =
    selected !== undefined
      ? wordKeyState(wordsWithStatuses[selected])
      : globalKeyState(answer, words, states);

  const { tillTheEnd } = useSettingsStore();

  const done = useMemo(
    () =>
      (!tillTheEnd && words.length >= 37) ||
      states.every((x) => x == BoardState.Solved),
    [tillTheEnd, words, states],
  );
  const is = inputStates.map((states) =>
    states.length > 0 ? states[states.length - 1] : InputState.Match,
  );

  function removeInputState() {
    setInputStates((inputStates) => inputStates.map((is) => is.slice(0, -1)));
  }

  function onButton(s: string) {
    if (input.length < 5) {
      const newInput = input + s;
      setInput(newInput);
      setInputStates((is) =>
        calcInputStates(
          knownWords,
          is,
          wordsWithStatuses,
          states,
          letterStats,
          newInput,
        ),
      );
    }
  }

  function onEnter() {
    if (input.length == 5) {
      if (knownWords.includes(input)) {
        addWord(input);
        const guess = answer.indexOf(input);
        if (guess !== -1 && guess === selected) {
          let next = (guess + 1) % 32;
          while (states[next] === BoardState.Solved && next != guess) {
            next = (next + 1) % 32;
          }
          setSelected(next != guess ? next : undefined);
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
      const idx = answer.indexOf(word);
      if (idx !== -1 && idx !== selected && states[idx] === BoardState.Normal) {
        setSelected(idx);
      } else {
        setSelected(undefined);
      }
    }
  }

  return (
    <div className="game">
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
      {!done ? (
        <Keyboard
          onLetter={onButton}
          onBackspace={onBackspace}
          onEnter={onEnter}
          keyState={keyState}
        />
      ) : (
        <Results gameTitle={title} answer={answer} words={words} />
      )}
    </div>
  );
}
