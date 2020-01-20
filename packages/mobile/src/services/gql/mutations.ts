import gql from 'graphql-tag'

export const PRE_SING_URLS_MUTATION = gql`
  mutation($input: [PreSignedUrlnput]!) {
    preSignUrls(input: $input) {
      url
      type
      filename
    }
  }
`

export const PRE_SING_URL_MUTATION = gql`
  mutation($input: PreSignedUrlInput!) {
    preSignUrl(input: $input) {
      url
      type
      filename
    }
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    token: refreshToken(refreshToken: $refreshToken) {
      access_token
    }
  }
`

export const REGISTER_DEVICE_TOKEN_MUTATION = gql`
  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
    registerDeviceToken(token: $token, platform: $platform)
  }
`
