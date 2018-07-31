export default `
  type User {
    id: String
    fullName: String
    firstName: String
    lastName: String
    userName: String
    avatarUrl: String
  }

  type Auth {
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
