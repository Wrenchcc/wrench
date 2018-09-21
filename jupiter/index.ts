import { S3 } from 'aws-sdk'
import micro, { json, send } from 'micro'
import { v4 } from 'uuid'
import { getUserFromRequest } from 'shared/utils/auth'
import { getContentType, getExtensionType } from './extensions'

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
  useAccelerateEndpoint: true,
})

const handler = async (req: any, res: any): Promise<{}> => {
  if (req.url.includes('/healthcheck')) {
    return { status: 'pass' }
  }

  // const user = getUserFromRequest(req)
  //
  // if (!user) {
  //   return send(res, 403, { error: 'Not authenticated' })
  // }

  try {
    const input = await json(req)

    return Promise.all(
      input.map(async ({ filename }) => {
        const ext = 'jpg'
        const id = v4()
        const type = getContentType(ext)
        const finalName = `${id}.${ext}`

        try {
          const params = {
            Bucket: APP_AWS_S3_BUCKET,
            ContentType: type,
            Key: finalName,
          }

          const url = await s3.getSignedUrl('putObject', params)

          return { url, type, id, filename: finalName }
        } catch (err) {
          debug('‰O', err)
        }
      })
    )
  } catch (err) {
    debug('‰O', err)
    return { error: 'Not a valid input' }
  }
}

export default micro(handler).listen(PORT)

debug('🚀  Jupiter ready at %s', `http://localhost:${PORT}`)
