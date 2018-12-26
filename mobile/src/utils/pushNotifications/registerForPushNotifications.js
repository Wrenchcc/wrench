import { messaging } from 'react-native-firebase'
import { client } from 'graphql/createClient'
import { RegisterDeviceToken } from 'graphql/mutations/user/registerDeviceToken'

const PLATFORM = 'mobile'

export default function requestNotificationToken() {
  if (__DEV__) return

  const firebase = messaging()

  firebase.requestPermission().then(() => {
    firebase.getToken().then(token => {
      client.mutate({ mutation: RegisterDeviceToken, variables: { token, platform: PLATFORM } })
    })
  })
}
