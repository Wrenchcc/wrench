import { pathOr } from 'ramda'
import { getDeviceToken } from '../../../models/DeviceToken'
import { getNotificationSettings, getUserLocale } from '../../../models/UserSettings'
import { getUserById } from '../../../models/User'
import formatNotification from './formatNotification'
import client from '../client'

const debug = require('debug')('api:firebase')

export default async ({ data, userId, sendTo, type }) => {
  const notificationSettings = await getNotificationSettings(sendTo)
  const isEnabled = pathOr(true, [type], notificationSettings)

  if (!isEnabled) {
    return null
  }

  const token = await getDeviceToken(sendTo)
  if (!token) {
    debug('No device token found for userId: %o', userId)
    return null
  }

  const locale = await getUserLocale(sendTo)
  const user = await getUserById(userId)

  const message = {
    android: {
      notification: {
        sound: 'notification.aiff',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'notification.aiff',
        },
      },
    },
    notification: formatNotification(type, data, user, locale),
    token,
  }

  client
    .messaging()
    .send(message)
    .then(response => {
      debug('Successfully sent message: %o', response)
    })
    .catch(error => {
      debug('Error sending message: %o', error)
    })
}
