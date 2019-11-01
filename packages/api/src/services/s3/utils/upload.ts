import client from '../client'

const debug = require('debug')('s3:upload')

export default async ({ Body, Bucket, Key }) => {
  try {
    return client.upload({ Body, Bucket, Key }).promise()
  } catch (err) {
    debug(err)
  }
}
