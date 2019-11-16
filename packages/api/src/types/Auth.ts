import gql from 'graphql-tag'

export default gql`
  type Tokens {
    access_token: String
    refresh_token: String
  }

  type AccessToken {
    access_token: String
  }

  input ApplePayload {
    firstName: String
    lastName: String
  }

  extend type Mutation {
    authenticateApple(identityToken: String!, user: ApplePayload!): Tokens
    authenticateFacebook(token: String!): Tokens
    authenticateGoogle(idToken: String!): Tokens
    refreshToken(refreshToken: String!): AccessToken
  }
`
