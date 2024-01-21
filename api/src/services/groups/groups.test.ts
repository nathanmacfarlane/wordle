import { groups, group } from './groups'
import type { StandardScenario } from './groups.scenarios'

describe('groups', () => {
  scenario('returns all groups', async (scenario: StandardScenario) => {
    const result = await groups()

    expect(result.length).toEqual(Object.keys(scenario.group).length)
  })

  scenario('returns a single group', async (scenario: StandardScenario) => {
    const result = await group({ id: scenario.group.one.id })

    expect(result).toEqual(scenario.group.one)
  })
})
