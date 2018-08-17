import gql from 'graphql-tag'

export const getAccessTokenMutation = gql`
  mutation getAccessToken($refreshToken: String!) {
    getAccessToken(refreshToken: $refreshToken) {
      tokens {
        accessToken
        refreshToken
      }
    }
  }
`
