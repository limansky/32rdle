export function InputLetter(letter: string, preview: string) {
  const l = letter !== '' ? <span className='letter-itself'>{letter}</span> :
                            <span className='letter-preview'>{preview}</span>;
    return <div className={"letter input-letter"}>{l}</div>;
}
