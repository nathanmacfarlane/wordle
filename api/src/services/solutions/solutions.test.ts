import { solution } from './solutions'
import type { StandardScenario } from './solutions.scenarios'

describe('solutions', () => {
  scenario('returns a single solution', async (scenario: StandardScenario) => {
    const result = await solution({ id: scenario.solution.one.id })

    expect(result).toEqual(scenario.solution.one)
  })
})
