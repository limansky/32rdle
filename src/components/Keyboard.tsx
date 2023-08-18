import { KeyState } from "../model/KeyState";
import { Key } from "./Key";
import "~/styles/keyboard.css";

export function Keyboard({ onLetter, onBackspace, onEnter, keyState }: {
  keyState: Map<string, KeyState>,
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
    const state = keyState.get(s) ?? KeyState.Unknown;
    switch (s) {
      case 'bksp': return Key('⌫', onBackspace, state);
      case 'enter': return Key('⏎', onEnter, state);
      default: return Key(s, onLetter, state);
    }
  }

  const rows = layout.map((keys, idx) => <div className={'keyboard-row-' + (idx + 1)} key={'kbdRow' + idx}>{keys.map(k => createKey(k))}</div>);

  return <>
    <div className='keyboard'>{...rows}</div>
  </>;
}
