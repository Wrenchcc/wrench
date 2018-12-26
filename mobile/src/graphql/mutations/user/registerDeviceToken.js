import gql from 'graphql-tag'

export const RegisterDeviceToken = gql`
  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
    registerDeviceToken(token: $token, platform: $platform)
  }
`
