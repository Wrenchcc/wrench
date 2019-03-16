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
    authenticate(facebookToken: String!): Tokens
    refreshToken(refreshToken: String!): AccessToken
  }
`
