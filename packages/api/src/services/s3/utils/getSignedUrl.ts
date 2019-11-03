import client from '../client'

const debug = require('debug')('s3:getSignedUrl')

export default async ({ Bucket, Key }) => {
  try {
    debug({ Bucket, Key })

    return client.getSignedUrl('putObject', {
      Bucket,
      Key,
    })
  } catch (err) {
    debug(err)
  }
}
