export default `
  type User {
    id: ID
    token: String
    avatarUrl: String
    refreshToken: String
  }
  type Mutation {
    addAuthenticatedUser(data: User): User
  }
  type Query {
    currentUser: User
  }
`
