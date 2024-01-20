import type { Prisma, Guess } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GuessCreateArgs>({
  guess: {
    one: {
      data: {
        word: 'String',
        nthGuess: 722918,
        correctCount: 1902555,
        misplacedCount: 9186304,
        incorrectCount: 2683959,
        solution: {
          create: { date: '2024-01-20T03:17:16.215Z', word: 'String' },
        },
        user: { create: { name: 'String', email: 'String8655540' } },
      },
    },
    two: {
      data: {
        word: 'String',
        nthGuess: 5610204,
        correctCount: 3160354,
        misplacedCount: 8541262,
        incorrectCount: 4532299,
        solution: {
          create: { date: '2024-01-20T03:17:16.215Z', word: 'String' },
        },
        user: { create: { name: 'String', email: 'String9470455' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Guess, 'guess'>
