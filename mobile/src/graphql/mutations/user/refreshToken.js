import gql from 'graphql-tag'

export const RefreshTokenMutation = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`
