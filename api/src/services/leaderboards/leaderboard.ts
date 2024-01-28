import { QueryResolvers } from 'types/graphql'

import { buildLeaderboard } from './buildLeaderboardHelper'

export const leaderboard: QueryResolvers['leaderboard'] = async ({ date }) => {
  return buildLeaderboard(date || new Date())
}
