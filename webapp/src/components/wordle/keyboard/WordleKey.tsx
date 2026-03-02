import { Delete } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { WordleLetterState } from '@/features/wordle'

import type { WordleKeyProps } from './types'

const stateStyles: Record<WordleLetterState, string> = {
  unknown: 'bg-[#818384]',
  absent: 'bg-[#3a3a3c]',
  present: 'bg-[#b59f3b]',
  correct: 'bg-[#538d4e]',
}

const WordleKey: React.FC<WordleKeyProps> = ({ label, state, wide = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded font-bold uppercase',
        label === 'Enter' ? 'text-[12px]' : 'text-[1.25em]',
        'h-14 select-none cursor-pointer transition-colors',
        'bg-secondary text-secondary-foreground border border-transparent',
        'text-white border-transparent',
        wide ? 'w-16' : 'w-10',
        state && stateStyles[state],
      )}
    >
      {label === 'Backspace' ? <Delete size={20} /> : label}
    </button>
  )
}

export default WordleKey
