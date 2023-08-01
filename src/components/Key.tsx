export function Key(letter: string, handler: (l: string) => void) {
  function handleClick(_e: React.MouseEvent<HTMLButtonElement>) {
    handler(letter);
  }

  return <button type='button' className='keyboard-key' key={'key-' + letter} onClick={handleClick}>{letter}</button>;
}
