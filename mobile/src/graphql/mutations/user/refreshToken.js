import gql from 'graphql-tag'

export const refreshTokenMutation = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`
