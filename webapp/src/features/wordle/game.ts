import words from '@/assets/words.json'

import type { WordleGameState, WordleGuess, WordleKeyboardState } from './types'

/**
 * Word of the day generator
 *
 * @param date Optional specific date to get the word for
 *
 * @returns The wordle word of the day
 */
function getWordOfTheDay(date: Date = new Date()): string {
  // 86400000 - (1000 * 60 * 60 * 24) - number of milliseconds in a day
  const daysSinceEpoch = Math.floor(date.getTime() / 86400000)

  return words[daysSinceEpoch % words.length]
}

/**
 * Creates a new wordle game state based on the word of the day
 *
 * @param date Optional specific date to create the game state for
 *
 * @returns The new wordle game state
 */
export function createWordleGameState(date?: Date): WordleGameState {
  return {
    word: getWordOfTheDay(date),
    guesses: [],
    maxGuesses: 6,
    isGameOver: false,
    isWin: false,
  }
}

/**
 * Wordle guess evaluation function
 *
 * Compares the player's guess to the target word
 *
 * @param guess The player's guess
 * @param word The target word
 *
 * @returns An array of letter states corresponding to the guess
 */
function evaluateGuess(guess: string, word: string): WordleGuess {
  // Initalize all letters as absent (instead of unknown) to simplify logic
  const wordleGuess = {
    guess,
    state: Array(word.length).fill('absent') as WordleGuess['state'],
  }
  // count the number of each letter in the word
  const letterCount: Record<string, number> = {}
  for (const letter of word) {
    letterCount[letter] = (letterCount[letter] ?? 0) + 1
  }

  // check for correct letters first
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i]

    if (letter === word[i]) {
      wordleGuess.state[i] = 'correct'
      letterCount[letter]--
    }
  }

  // check for present letters (misplaced)
  for (let i = 0; i < guess.length; i++) {
    if (wordleGuess.state[i] !== 'absent') continue

    const letter = guess[i]

    if ((letterCount[letter] ?? 0) > 0) {
      wordleGuess.state[i] = 'present'
      letterCount[letter]--
    }
  }

  return wordleGuess
}

/**
 * Processes a player's guess and updates the game state accordingly
 *
 * @param gameState The current game state before the guess
 * @param guess The player's guess
 *
 * @returns The updated game state after processing the guess
 */
export function makeWordleGuess(gameState: WordleGameState, guess: string): WordleGameState {
  const wordleGuess = evaluateGuess(guess, gameState.word)

  const isWin = wordleGuess.state.every((letterPosition) => letterPosition === 'correct')
  const isGameOver = isWin || gameState.guesses.length + 1 >= gameState.maxGuesses

  return {
    ...gameState,
    guesses: [...gameState.guesses, wordleGuess],
    isGameOver,
    isWin,
  }
}

/**
 * Wordle keyboard state generator
 *
 * Wordle follows a simple method for the keyboard overall guesses:
 *  - if you guessed a letter in the correct position, it's marked as green in the keyboard
 *  - if you guessed a letter in the word but in the wrong position, it's marked as yellow in the keyboard
 *  - if you guessed a letter that is not in the word, it's marked as gray in the keyboard
 * @param gameState
 * @returns
 */
export function getWordleKeyboardState(gameState: WordleGameState): WordleKeyboardState {
  const keyboardState: WordleKeyboardState = {}

  for (const guess of gameState.guesses) {
    for (let i = 0; i < guess.guess.length; i++) {
      const letter = guess.guess[i]
      const state = guess.state[i]

      if (keyboardState[letter] === 'correct') continue

      if (state === 'correct') {
        keyboardState[letter] = 'correct'
      } else if (state === 'present') {
        keyboardState[letter] = 'present'
      } else if (state === 'absent' && !(letter in keyboardState)) {
        keyboardState[letter] = 'absent'
      }
    }
  }

  return keyboardState
}

/**
 * Checks if a guess is a valid word
 *
 * @param guess The player's guess
 *
 * @returns Whether the guess is a valid word
 */
export function isValidWordleGuess(guess: string): boolean {
  return words.includes(guess)
}
