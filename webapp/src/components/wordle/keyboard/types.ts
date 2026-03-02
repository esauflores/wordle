import type { WordleLetterState, WordleKeyboardState } from '@/features/wordle'

// Component prop types

export type WordleKeyProps = {
  label: string
  state?: WordleLetterState
  wide?: boolean
  onClick: () => void
}

export type WordleKeyboardProps = {
  keyboard: WordleKeyboardState
  onKey: (key: string) => void
}
