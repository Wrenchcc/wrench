import gql from 'graphql-tag'

export default gql`
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  extend type Mutation {
    authenticate(facebookToken: String!, platform: PlatformType!): Tokens
    refreshToken(refreshToken: String!): Tokens
  }
`
