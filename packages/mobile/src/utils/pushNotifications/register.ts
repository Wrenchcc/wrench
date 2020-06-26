import messaging from '@react-native-firebase/messaging'
import { registerDeviceToken } from 'gql'
import { track, events } from 'utils/analytics'

const { AuthorizationStatus } = messaging

export async function updateNotificationToken() {
  if (__DEV__) {
    return
  }

  const firebase = messaging()
  const authStatus = await firebase.requestPermission()
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL

  if (enabled) {
    const token = await firebase.getToken()

    if (token) {
      await registerDeviceToken(token)
    }

    // Look for new tokens
    firebase.onTokenRefresh(async (newToken) => {
      if (token !== newToken) {
        await registerDeviceToken(newToken)
      }
    })
  }
}

export async function requestNotificationToken(onPermission) {
  if (__DEV__ && onPermission) {
    onPermission()
    return
  }

  const firebase = messaging()
  const authStatus = await firebase.requestPermission()
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL

  if (enabled) {
    const token = await firebase.getToken()

    if (token) {
      await registerDeviceToken(token)
    }

    if (onPermission) {
      onPermission()
    }
  } else {
    if (onPermission) {
      return
    }

    // User has rejected permissions
    track(events.USER_REJECTED_PUSH_NOTIFICATIONS)
  }
}
