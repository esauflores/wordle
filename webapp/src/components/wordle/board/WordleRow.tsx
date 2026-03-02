import type { WordleGuess } from '@/features/wordle'

import WordleTile from './WordleTile'

type WordleRowProps = {
  guess?: WordleGuess
  current?: string
  wordLength: number
}

const WordleRow: React.FC<WordleRowProps> = ({ guess, current, wordLength }) => {
  return (
    <div className="flex gap-1">
      {/* If already guessed show the letter from the game state*/}
      {/* if not, show the current guess letter */}
      {Array.from({ length: wordLength }).map((_, i) => {
        if (guess) {
          return <WordleTile key={i} letter={guess.guess[i]} state={guess.state[i]} />
        }

        return <WordleTile key={i} letter={current?.[i]} />
      })}
    </div>
  )
}

export default WordleRow
