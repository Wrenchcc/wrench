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
      addLoggedInUser(data: User): User
    }
    type Query {
      loggedInUser: User
      getToken: Auth
    }
  `
