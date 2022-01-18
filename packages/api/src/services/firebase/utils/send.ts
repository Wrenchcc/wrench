import { pathOr } from 'ramda'
import { getDeviceToken } from '../../../models/DeviceToken'
import { getNotificationSettings, getUserLocale } from '../../../models/UserSettings'
import { getUserById } from '../../../models/User'
import formatNotification from './formatNotification'
import formatCustomData from './formatCustomData'
import client from '../client'

const debug = require('debug')('api:firebase')

export default async ({ data, userId, to, type }) => {
  const notificationSettings = await getNotificationSettings(to)
  const isEnabled = pathOr(true, [type, 'push'], notificationSettings)

  if (!isEnabled) {
    return null
  }

  const token = await getDeviceToken(to)
  if (!token) {
    debug('No device token found for userId: %o', to)
    return null
  }

  const locale = await getUserLocale(to)
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
    data: formatCustomData(type, data, user),
    token,
  }

  debug('Message payload: %o', message)

  client
    .messaging()
    // @ts-ignore
    .send(message)
    .then((response) => {
      debug('Successfully sent message: %o', response)
    })
    .catch((error) => {
      debug('Error sending message: %o', error)
    })
}
