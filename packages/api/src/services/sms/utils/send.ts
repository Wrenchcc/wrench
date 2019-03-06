import client from '../client'

const debug = require('debug')('api:sms')

export default async number => {
  try {
    if (!number) {
      debug('No number provided')
      return
    }

    const params = {
      Message: 'Click here to download Wrench https://wrench.cc',
      PhoneNumber: number,
    }

    client.setSMSAttributes({
      attributes: {
        DefaultSenderID: 'Wrench',
      },
    })

    client.publish(params, error => {
      if (error) {
        debug('Error sending message: %o', error.stack)
      } else {
        debug('Successfully sent message: %o', params)
      }
    })
  } catch (err) {
    debug(err)
  }
}
