import gql from 'graphql-tag'

export const AUTHENTICATE_USER = gql`
  mutation authenticate($facebookToken: String!, $platform: PlatformType!) {
    authenticate(facebookToken: $facebookToken, platform: $platform) {
      access_token
      refresh_token
    }
  }
`
