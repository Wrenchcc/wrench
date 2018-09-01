import { messaging } from 'react-native-firebase'

export default function requestNotificationToken() {
  if (__DEV__) return

  const firebase = messaging()

  firebase.requestPermission().then(() => {
    // TODO: Send away!
    firebase.getToken().then(token => console.log(token))
  })
}
