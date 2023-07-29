import './App.css'
import { Boards } from './components/Boards';
import { Keyboard } from './components/Keyboard';

function App() {

  function onButton(s: string) {
    console.log('handle key ' + s);
  }

  function onEnter() {
    console.log('Enter!')
  }

  function onBackspace() {
    console.log('backspace')
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
