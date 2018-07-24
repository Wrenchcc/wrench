import firebase from 'react-native-firebase'

export default function requestNotificationToken() {
  if (__DEV__) return

  const messaging = firebase.messaging()

  messaging.requestPermission().then(() => {
    // TODO: Send away!
    messaging.getToken().then(token => console.log(token))
  })
}
