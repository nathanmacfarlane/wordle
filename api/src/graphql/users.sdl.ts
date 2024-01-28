export const schema = gql`
  type User {
    id: String!
    name: String!
    email: String!
    imageUrl: String!
  }

  type Profile {
    id: String!
    name: String!
    email: String!
    imageUrl: String!
    totalWordles: Int!
    winPercentage: Float
    averageScore: Float
    badges: [BadgeInfo!]!
  }

  type BadgeInfo {
    badge: Badge!
    title: String!
    firstReceived: Date!
  }

  enum Badge {
    monthly_winner
    win_streak_5_days
    win_streak_3_days
    monthly_avg_3
    monthly_avg_4
    weekly_avg_4
    weekly_avg_3
    guess_in_1
    guess_in_2
  }

  type Query {
    totalWordles(id: String): Int! @requireAuth
    winPercentage(id: String): Float @requireAuth
    averageScore(id: String): Float @requireAuth
    profile(id: String): Profile @requireAuth
  }

  type Mutation {
    updateUserTz(timezone: String!): Boolean @requireAuth
  }
`
