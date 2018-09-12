export default `
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  type AuthenticateUser {
    tokens: Tokens
  }

  extend type Mutation {
    authenticateUser(facebookToken: String!): AuthenticateUser
    refreshToken(refreshToken: String!): AuthenticateUser
	}
`
