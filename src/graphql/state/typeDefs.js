export default `
  type User {
    id: String
    fullName: String
    firstName: String
    lastName: String
    username: String
    avatarUrl: String

    token: String
    refreshToken: String
  }

  type Mutation {
    addCurrentUser(data: User): User
  }

  type Query {
    getCurrentUser: User
  }
`
