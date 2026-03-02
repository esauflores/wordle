export type WordleLetterState = 'unknown' | 'absent' | 'present' | 'correct'

export type WordleGameState = {
  word: string
  guesses: WordleGuess[]
  maxGuesses: number
  isGameOver: boolean
  isWin: boolean
}

export type WordleGuess = {
  guess: string
  state: WordleLetterState[]
}

export type WordleKeyboardState = Record<string, WordleLetterState>
