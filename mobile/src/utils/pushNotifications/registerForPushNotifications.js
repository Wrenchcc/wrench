import { messaging } from 'react-native-firebase'
import { client } from 'graphql/createClient'
import { RegisterDeviceToken } from 'graphql/mutations/user/registerDeviceToken'
import { track, events } from 'utils/analytics'
import { PLATFORM_TYPES } from 'utils/enums'

async function savePushNotificationToken(token) {
  return client.mutate({
    mutation: RegisterDeviceToken,
    variables: {
      token,
      platform: PLATFORM_TYPES.MOBILE,
    },
  })
}

export default async function requestNotificationToken() {
  if (__DEV__) return

  const firebase = messaging()
  const enabled = await firebase.hasPermission()

  if (enabled) {
    const token = await firebase.getToken()

    if (token) {
      await savePushNotificationToken(token)
    }

    // Look for new tokens
    firebase.onTokenRefresh(async newToken => {
      if (token !== newToken) {
        await savePushNotificationToken(newToken)
      }
    })
  } else {
    try {
      await firebase.requestPermission()
      const token = await firebase.getToken()

      if (token) {
        await savePushNotificationToken(token)
      }
    } catch (error) {
      // User has rejected permissions
      track(events.USER_REJECTED_PUSH_NOTIFICATIONS)
    }
  }
}
