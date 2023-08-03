import { Key } from "./Key";
import "../styles/keyboard.css"

export function Keyboard({ onLetter, onBackspace, onEnter }: {
  onLetter: (s: string) => void,
  onBackspace: () => void,
  onEnter: () => void,
}
) {

  const layout = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['bksp', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'enter']
  ];

  function createKey(s: string) {
    switch (s) {
      case 'bksp': return Key('⌫', onBackspace);
      case 'enter': return Key('⏎', onEnter);
      default: return Key(s, onLetter);
    }
  }

  const rows = layout.map((keys, idx) => <div className={'keyboard-row-' + (idx + 1)} key={'kbdRow' + idx}>{keys.map(k => createKey(k))}</div>);

  return <>
    <div className='keyboard'>{...rows}</div>
  </>;
}
