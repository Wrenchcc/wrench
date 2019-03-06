import client from '../client'

const debug = require('debug')('api:sms')

export default async ({ message, number }) => {
  try {
    const params = {
      Message: message,
      PhoneNumber: number,
    }

    client.publish(params)

    // if (error) {
    //   debug('Error sending message: %o', error.stack)
    // } else {
    //   debug('Successfully sent message: %o', message)
    // }
  } catch (err) {
    debug(err)
  }
}
