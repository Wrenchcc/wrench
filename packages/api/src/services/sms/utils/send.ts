import client from '../client'

const debug = require('debug')('api:sms')

export default async number => {
  try {
    if (!number) {
      debug('No number provided')
      return
    }

    const params = {
      Message:
        'Click here to download Wrench for iPhone: http://appstore.com/cc.wrench.app Android: https://play.google.com/store/apps/details?id=com.wrench',
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
