import { pathOr } from 'ramda'
import { getDeviceToken } from 'api/models/DeviceToken'
import { getNotificationSettings, getUserLocale } from 'api/models/UserSettings'
import { getUserById } from 'api/models/User'
import formatNotification from './formatNotification'
import admin from './config'

const debug = require('debug')('api:firebase')

export default async ({ data, userId, to, type }) => {
  const notificationSettings = await getNotificationSettings(to)
  const isEnabled = pathOr(true, ['value', type], notificationSettings)

  if (!isEnabled) {
    return null
  }

  const { token } = await getDeviceToken(to)
  const locale = await getUserLocale(to)
  const user = await getUserById(userId)

  const message = {
    data: {
      dynamicLink: 'https://google.se',
    },
    notification: formatNotification(type, data, user, locale),
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
