import gql from 'graphql-tag'

export default gql`
  type Tokens {
    access_token: String
    refresh_token: String
  }

  type AccessToken {
    access_token: String
  }

  extend type Mutation {
    authenticate(facebookToken: String!, platform: PlatformType!): Tokens
    refreshToken(refreshToken: String!): AccessToken
  }
`
