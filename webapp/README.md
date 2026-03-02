# Wordle

A Wordle clone built with Vite, React and TypeScript.

Developed as a project for React Course.

The game logic was taken from [hs-react-408](https://github.com/christopherjbaker/hs-react-408); Remixed and extended with feature-based architecture.

## Architecture

The project follows a **feature-based architecture** with a clean separation between game logic and UI.

```
src/
├── assets/          # Word lists
├── features/
│   └── wordle/      # Game logic (framework-agnostic)
│       ├── types.ts
│       ├── game.ts
│       └── index.ts
└── components/
    └── wordle/      # UI layer
```

## Game Logic

### State

```ts
type WordleGameState = {
  word: string
  guesses: WordleGuess[]
  maxGuesses: number
  isGameOver: boolean
  isWin: boolean
}

type WordleGuess = {
  guess: string // the guessed word
  state: WordleLetterState[] // per-letter evaluation
}

type WordleLetterState = 'unknown' | 'correct' | 'present' | 'absent'
```

### Functions

**`createWordleGameState(date?)`**

Creates a fresh game state. The target word is derived deterministically from the current date — the same word is returned for all calls on the same day.

**`makeWordleGuess(gameState, guess)`**

Takes the current state and a guess string, returns a new state with the guess evaluated. Does not mutate the input state. The evaluation follows Wordle's rules:
1. Letters in the correct position → `correct`
2. Letters present in the word but wrong position → `present` (respects letter count to avoid false positives)
3. All other letters → `absent`

**`getWordleKeyboardState(gameState)`**

Generates the keyboard state for the on-screen keyboard based on all past guesses following Wordle's rules:
1. If any guess has a letter in the correct position → `correct`
2. Else if any guess has the letter present but wrong position → `present`
3. Else if any guess has the letter absent → `absent`
4. Else → `unknown` -- for letters not yet guessed

**`isValidWordleGuess(guess)`**

Returns whether the guessed word exists in the word list.
