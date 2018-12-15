import * as admin from 'firebase-admin'
import { pathOr } from 'ramda'
import { getDeviceToken } from 'api/models/DeviceToken'
import { getNotificationSettings } from 'api/models/UserSettings'

const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert(require('./wrench-app-firebase.json')),
})

export const sendPushNotification = async ({ data, from, to, type }) => {
  const device = await getDeviceToken(to.userId)
  const notificationSettings = await getNotificationSettings(to.userId)

  const isEnabled = pathOr(true, ['value', type], notificationSettings)

  if (!isEnabled) {
    return null
  }

  // See documentation on defining a message payload.
  const message = {
    notification: {
      body: 'Pontus Abrahamsson started following your project The Natural.',
      title: 'New follower',
    },
    token: device.token,
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
