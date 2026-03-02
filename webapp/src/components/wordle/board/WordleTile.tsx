import { cn } from '@/lib/utils'

import type { WordleLetterState } from '@/features/wordle'

type WordleTileProps = {
  letter?: string
  state?: WordleLetterState
}

const stateStyles: Record<WordleLetterState, string> = {
  unknown: 'bg-transparent border-[#3a3a3c]',
  correct: 'bg-[#538d4e] border-none text-white',
  present: 'bg-[#b59f3b] border-none text-white',
  absent: 'bg-[#3a3a3c] border-none text-white',
}

const WordleTile: React.FC<WordleTileProps> = ({ letter, state = 'unknown' }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'w-14 sm:w-13 h-14 sm:h-13 border-2',
        'text-2xl font-bold uppercase',
        stateStyles[state],
        letter && state === 'unknown' && 'border-[#565758]',
      )}
    >
      {letter}
    </div>
  )
}

export default WordleTile
