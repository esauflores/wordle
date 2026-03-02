import type { WordleGameState } from '@/features/wordle'

import WordleRow from './WordleRow'

type WordleBoardProps = {
  gameState: WordleGameState
  currentGuess: string
}

const WordleBoard: React.FC<WordleBoardProps> = ({ gameState, currentGuess }) => {
  const { guesses, maxGuesses, word } = gameState
  const wordLength = word.length
  const currentRow = guesses.length

  const emptyRows = maxGuesses - currentRow - (gameState.isGameOver ? 0 : 1)

  return (
    <div className="flex flex-col gap-1">
      {/* Already guessed words */}
      {guesses.map((guess, i) => (
        <WordleRow key={i} guess={guess} wordLength={wordLength} />
      ))}

      {/* Current guess (only if the game is not over) */}
      {!gameState.isGameOver && <WordleRow current={currentGuess} wordLength={wordLength} />}

      {/* Empty rows */}
      {Array.from({ length: Math.max(0, emptyRows) }).map((_, i) => (
        <WordleRow key={`empty-${i.toString()}`} wordLength={wordLength} />
      ))}
    </div>
  )
}

export default WordleBoard
