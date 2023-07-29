export function Key(letter: string, handler: (l: string) => void) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handler(letter);
  }

  return <button className='keyboard-key' key={'key-' + letter} onClick={handleClick}>{letter}</button>;
}
