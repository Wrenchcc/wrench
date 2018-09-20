import { S3 } from 'aws-sdk'
import micro, { json } from 'micro'
import { v4 } from 'uuid'
import { getUserFromRequest } from 'shared/utils/auth'

const debug = require('debug')('api:jupiter')

const {
  API_AWS_ACCESS_KEY,
  API_AWS_REGION,
  API_AWS_S3_BUCKET,
  API_AWS_SECRET_ACCESS_KEY,
  PORT = 5000,
} = process.env

const s3 = new S3({
  accessKeyId: API_AWS_ACCESS_KEY,
  region: API_AWS_REGION,
  secretAccessKey: API_AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

// NOTE: Default expire time is 15 minutes
const handler = async (req: any, res: any): Promise<{}> => {
  const user = getUserFromRequest(req)

  if (!user) {
    return { error: 'Not authenticated' }
  }

  if (req.url.includes('/healthcheck')) {
    return { status: 'pass' }
  }

  try {
    const input = await json(req)

    return Promise.all(
      input.map(async ({ filename }) => {
        const id = v4()

        try {
          const params = {
            Bucket: API_AWS_S3_BUCKET,
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
