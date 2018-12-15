import * as admin from 'firebase-admin'
import { pathOr } from 'ramda'
import { getDeviceToken } from 'api/models/DeviceToken'
import { getNotificationSettings } from 'api/models/UserSettings'
import { getUserById } from 'api/models/User'
import formatNotification from 'api/utils/formatNotification'

const debug = require('debug')('api:firebase')

const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert(require('./wrench-app-firebase.json')),
})

export const sendPushNotification = async ({ data, userId, to, type }) => {
  const notificationSettings = await getNotificationSettings(to.userId)
  const isEnabled = pathOr(true, ['value', type], notificationSettings)

  if (!isEnabled) {
    return null
  }

  const { token } = await getDeviceToken(to.userId)
  const user = await getUserById(userId)

  const message = {
    notification: formatNotification(type, data, user),
    token,
  }

  admin
    .messaging()
    .send(message)
    .then(response => {
      debug('Successfully sent message: %o', response)
    })
    .catch(error => {
      debug('Error sending message: %o', error)
    })
}
