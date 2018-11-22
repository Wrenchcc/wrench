export default `
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  extend type Mutation {
    authenticate(facebookToken: String!): Tokens
    refreshToken(refreshToken: String!): Tokens
	}
`
