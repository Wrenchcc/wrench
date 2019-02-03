import client from '../client'
import { getUserById } from '../../../models/User'
import formatMail from './formatMail'

const debug = require('debug')('api:mail')

export default async ({ type, userId }) => {
  if (!userId) return

  try {
    const user = await getUserById(userId)

    if (!user.email) {
      debug('No email found for userId: %o', userId)
      return
    }

    const message = formatMail(type, user)
    client.sendTemplatedEmail(message, error => {
      if (error) {
        debug('Error sending message: %o', error.stack)
      } else {
        debug('Successfully sent message: %o', message)
      }
    })
  } catch (err) {
    debug(err)
  }
}
