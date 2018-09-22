import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import debug from 'debug'
import { getContentType, getExtensionType } from 'api/utils/fileExtensions'

const {
  APP_AWS_ACCESS_KEY,
  APP_AWS_REGION,
  APP_AWS_S3_BUCKET,
  APP_AWS_SECRET_ACCESS_KEY,
} = process.env

const s3 = new S3({
  accessKeyId: APP_AWS_ACCESS_KEY,
  region: APP_AWS_REGION,
  secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default (_, { input }, ctx) => {
  try {
    return Promise.all(
      input.map(async ({ filename }) => {
        const ext = getExtensionType(filename)
        const type = getContentType(ext)
        const id = v4()
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
  }
}
