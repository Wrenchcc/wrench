import gql from 'graphql-tag'

export default gql`
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  extend type Mutation {
    authenticate(facebookToken: String!): Tokens
    refreshToken(refreshToken: String!): Tokens
  }
`
