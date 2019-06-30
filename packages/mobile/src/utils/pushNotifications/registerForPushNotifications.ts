import { messaging } from 'react-native-firebase'
import { client, REGISTER_DEVICE_TOKEN_MUTATION } from 'gql'
import { track, events } from 'utils/analytics'
import { PLATFORM_TYPES } from 'utils/enums'

async function registerDeviceToken(token) {
  client.mutate({
    mutation: REGISTER_DEVICE_TOKEN_MUTATION,
    variables: {
      platform: PLATFORM_TYPES.MOBILE,
      token,
    },
  })
}

export default async function requestNotificationToken() {
  if (__DEV__) {
    return
  }

  const firebase = messaging()
  const enabled = await firebase.hasPermission()

  if (enabled) {
    const token = await firebase.getToken()

    if (token) {
      await registerDeviceToken(token)
    }

    // Look for new tokens
    firebase.onTokenRefresh(async newToken => {
      if (token !== newToken) {
        await registerDeviceToken(newToken)
      }
    })
  } else {
    try {
      await firebase.requestPermission()
      const token = await firebase.getToken()

      if (token) {
        await registerDeviceToken(token)
      }
    } catch (error) {
      // User has rejected permissions
      track(events.USER_REJECTED_PUSH_NOTIFICATIONS)
    }
  }
}
