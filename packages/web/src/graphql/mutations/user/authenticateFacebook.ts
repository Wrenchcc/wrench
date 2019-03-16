import gql from 'graphql-tag'

export const AUTHENTICATE_FACEBOOK = gql`
  mutation authenticateFacebook($token: String!) {
    authenticateFacebook(token: $token) {
      access_token
      refresh_token
    }
  }
`
