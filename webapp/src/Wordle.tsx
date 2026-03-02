import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { WordleBoard, WordleKeyboard } from '@/components/wordle'
import {
  createWordleGameState,
  getWordleKeyboardState,
  isValidWordleGuess,
  makeWordleGuess,
} from '@/features/wordle'

import type { WordleGameState } from '@/features/wordle'
import type { JSX } from 'react'

const WORD_LENGTH = 5

function Wordle(): JSX.Element {
  const [gameState, setGameState] = useState<WordleGameState>(createWordleGameState())
  const [currentGuess, setCurrentGuess] = useState<string>('')

  const handleKey = useCallback(
    (key: string): void => {
      if (gameState.isGameOver) return

      if (key === 'Enter') {
        if (currentGuess.length !== WORD_LENGTH) {
          toast('Not enough letters')
          return
        }

        if (!isValidWordleGuess(currentGuess)) {
          toast('Not in word list')
          return
        }

        setGameState(makeWordleGuess(gameState, currentGuess))
        setCurrentGuess('')

        if (makeWordleGuess(gameState, currentGuess).isWin) {
          toast('Congratulations! You guessed the word!')
        }

        return
      }

      if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }

      if (/^[a-z]$/.test(key) && currentGuess.length < gameState.word.length) {
        setCurrentGuess((prev) => prev + key)
      }
    },
    [gameState, currentGuess],
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      handleKey(e.key.length === 1 ? e.key.toLowerCase() : e.key)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [handleKey])

  return (
    <div className="bg-[#121213] flex flex-col items-center justify-between min-h-screen py-8">
      <WordleBoard gameState={gameState} currentGuess={currentGuess} />
      <WordleKeyboard keyboard={getWordleKeyboardState(gameState)} onKey={handleKey} />
    </div>
  )
}

export default Wordle
