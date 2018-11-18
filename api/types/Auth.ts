export default `
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  type Authenticate {
    tokens: Tokens
  }

  extend type Mutation {
    authenticate(facebookToken: String!): Authenticate
    refreshToken(refreshToken: String!): Authenticate
	}
`
