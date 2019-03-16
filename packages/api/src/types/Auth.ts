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
    refreshToken(refreshToken: String!): AccessToken
  }
`
