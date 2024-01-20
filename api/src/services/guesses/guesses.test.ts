import type { Guess } from '@prisma/client'

import {
  guesses,
  guess,
  createGuess,
  updateGuess,
  deleteGuess,
} from './guesses'
import type { StandardScenario } from './guesses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('guesses', () => {
  scenario('returns all guesses', async (scenario: StandardScenario) => {
    const result = await guesses()

    expect(result.length).toEqual(Object.keys(scenario.guess).length)
  })

  scenario('returns a single guess', async (scenario: StandardScenario) => {
    const result = await guess({ id: scenario.guess.one.id })

    expect(result).toEqual(scenario.guess.one)
  })

  scenario('creates a guess', async (scenario: StandardScenario) => {
    const result = await createGuess({
      input: {
        word: 'String',
        nthGuess: 6451322,
        correctCount: 7103184,
        misplacedCount: 4152052,
        incorrectCount: 7143751,
        solutionId: scenario.guess.two.solutionId,
        userId: scenario.guess.two.userId,
      },
    })

    expect(result.word).toEqual('String')
    expect(result.nthGuess).toEqual(6451322)
    expect(result.correctCount).toEqual(7103184)
    expect(result.misplacedCount).toEqual(4152052)
    expect(result.incorrectCount).toEqual(7143751)
    expect(result.solutionId).toEqual(scenario.guess.two.solutionId)
    expect(result.userId).toEqual(scenario.guess.two.userId)
  })

  scenario('updates a guess', async (scenario: StandardScenario) => {
    const original = (await guess({ id: scenario.guess.one.id })) as Guess
    const result = await updateGuess({
      id: original.id,
      input: { word: 'String2' },
    })

    expect(result.word).toEqual('String2')
  })

  scenario('deletes a guess', async (scenario: StandardScenario) => {
    const original = (await deleteGuess({ id: scenario.guess.one.id })) as Guess
    const result = await guess({ id: original.id })

    expect(result).toEqual(null)
  })
})
