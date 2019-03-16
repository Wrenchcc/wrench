import gql from 'graphql-tag'

export const AUTHENTICATE_USER = gql`
  mutation authenticate($facebookToken: String!) {
    authenticate(facebookToken: $facebookToken) {
      access_token
      refresh_token
    }
  }
`
