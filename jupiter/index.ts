import { S3 } from 'aws-sdk'
import micro, { json } from 'micro'
import { v4 } from 'uuid'
import { getUserFromRequest } from 'shared/utils/auth'

const debug = require('debug')('api:jupiter')

const {
  APP_AWS_ACCESS_KEY,
  APP_AWS_REGION,
  APP_AWS_S3_BUCKET,
  APP_AWS_SECRET_ACCESS_KEY,
  PORT = 5000,
} = process.env

const s3 = new S3({
  accessKeyId: APP_AWS_ACCESS_KEY,
  region: APP_AWS_REGION,
  secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

// NOTE: Default expire time is 15 minutes
const handler = async (req: any, res: any): Promise<{}> => {
  if (req.url.includes('/healthcheck')) {
    return { status: 'pass' }
  }

  const user = getUserFromRequest(req)

  if (!user) {
    return { error: 'Not authenticated' }
  }

  try {
    const input = await json(req)

    return Promise.all(
      input.map(async ({ filename }) => {
        const id = v4()

        try {
          const params = {
            Bucket: APP_AWS_S3_BUCKET,
            Key: id,
          }

          const url = await s3.getSignedUrl('putObject', params)

          return { url, id }
        } catch (err) {
          debug('‰O', err)
        }
      })
    )
  } catch (err) {
    debug('‰O', err)
    return { error: 'No valid json format' }
  }
}

export default micro(handler).listen(PORT)

debug('🚀  Jupiter ready at %s', `http://localhost:${PORT}`)
