import type { WordleKeyboardProps } from './types'

import WordleKey from './WordleKey'

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
]

const WordleKeyboard: React.FC<WordleKeyboardProps> = ({ keyboard, onKey }) => {
  return (
    <div className="flex flex-col items-center gap-2.25 sm:gap-1">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 sm:gap-1">
          {row.map((key) => (
            <WordleKey
              key={key}
              label={key}
              state={keyboard[key] ?? 'unknown'}
              wide={key === 'Enter' || key === 'Backspace'}
              onClick={() => onKey(key)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default WordleKeyboard
