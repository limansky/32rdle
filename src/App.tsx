import { useState } from 'react';
import './App.css'
import { Boards } from './components/Boards';
import { Keyboard } from './components/Keyboard';
import { useDispatch } from 'react-redux';
import { addWord } from './app/wordsSlice';

function App() {

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function onButton(s: string) {
    if (input.length < 5) setInput(input + s);
  }

  function onEnter() {
    if (input.length < 5) setInput(""); else {
      dispatch(addWord(input));
      console.log("Enter " + input);
    }
  }

  function onBackspace() {
    if (input.length > 0) {
      setInput(input.substring(0, input.length - 1));
    }
  }

  return (
    <>
      <h1>Это 32rdle</h1>
      <Boards />
      <Keyboard onLetter={onButton} onBackspace={onBackspace} onEnter={onEnter}/>
    </>
  );
}

export default App
