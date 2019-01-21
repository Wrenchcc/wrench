import { S3 } from 'aws-sdk'
import Promise from 'bluebird'
import { v4 } from 'uuid'
import debug from 'debug'
import { isAuthenticated } from 'api/utils/permissions'
import { getContentType, getExtensionType } from 'api/utils/fileExtensions'

const {
  APP_AWS_ACCESS_KEY,
  APP_AWS_S3_REGION,
  APP_AWS_S3_BUCKET,
  APP_AWS_SECRET_ACCESS_KEY,
} = process.env

const s3 = new S3({
  accessKeyId: APP_AWS_ACCESS_KEY,
  region: APP_AWS_S3_REGION,
  secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

const CONCURRENCY = 5

export default isAuthenticated(async (_, { input }, ctx) => {
  try {
    return Promise.map(
      input,
      async file => {
        const ext = getExtensionType(file.filename)
        const type = getContentType(ext)
        const id = v4()
        const filename = `${id}.${ext}`

        try {
          const params = {
            Bucket: APP_AWS_S3_BUCKET,
            ContentType: type,
            Key: filename,
          }

          const url = await s3.getSignedUrl('putObject', params)

          return { url, type, id, filename }
        } catch (err) {
          debug('‰O', err)
        }
      },
      { concurrency: CONCURRENCY }
    )
  } catch (err) {
    debug('‰O', err)
  }
})
