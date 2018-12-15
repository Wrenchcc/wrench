import * as admin from 'firebase-admin'

const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert(require('./wrench-app-firebase.json')),
})

export const sendPushNotification = async ({ to, ...notification }) => {
  const token = ''
  // TODO: Get deviceTokens
  console.log(token)
  console.log(to, notification)

  // Get user by id

  // Se if type is enabled in userSettings

  // formatNotification

  // See documentation on defining a message payload.
  const message = {
    notification: {
      body: 'Pontus Abrahamsson started following your project The Natural.',
      title: 'New follower',
    },
    token,
  }

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response)
    })
    .catch(error => {
      console.log('Error sending message:', error)
    })
}
