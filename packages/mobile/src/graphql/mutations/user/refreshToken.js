import gql from 'graphql-tag'

export const RefreshTokenMutation = gql`
  mutation refreshToken($refreshToken: String!) {
    token: refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`
