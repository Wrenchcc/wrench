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
    authenticateFacebook(token: String!): Tokens
    authenticateGoogle(idToken: String!, code: String!): Tokens
    authenticateApple(idToken: String!, code: String!): Tokens
    refreshToken(refreshToken: String!): AccessToken
  }
`
