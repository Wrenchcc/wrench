import gql from 'graphql-tag'

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    token: refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`
