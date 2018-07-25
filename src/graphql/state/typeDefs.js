export default `
    type Auth {
      token: String
      refreshToken: String
    }
    type Mutation {
      addLoggedInUser(data: Auth): Auth
    }
    type Query {
      loggedInUser: Auth
    }
  `
