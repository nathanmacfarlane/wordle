import type { Prisma, Solution } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SolutionCreateArgs>({
  solution: {
    one: { data: { date: '2024-01-19T18:57:23.478Z', word: 'String' } },
    two: { data: { date: '2024-01-19T18:57:23.478Z', word: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Solution, 'solution'>
