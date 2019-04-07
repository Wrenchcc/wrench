import gql from 'graphql-tag'
import { client } from 'graphql-old/createClient'
import { PLATFORM_TYPES } from 'utils/enums'

const RegisterDeviceToken = gql`
  mutation registerDeviceToken($token: String!, $platform: PlatformType!) {
    registerDeviceToken(token: $token, platform: $platform)
  }
`

export async function savePushNotificationToken(token) {
  return client.mutate({
    mutation: RegisterDeviceToken,
    variables: {
      token,
      platform: PLATFORM_TYPES.MOBILE,
    },
  })
}
