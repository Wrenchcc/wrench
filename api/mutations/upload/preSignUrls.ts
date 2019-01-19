import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import debug from 'debug'
import { isAuthenticated } from 'api/utils/permissions'
import { getContentType, getExtensionType } from 'api/utils/fileExtensions'

// TODO: Needed?
const { AWS_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, AWS_SECRET_ACCESS_KEY } = process.env

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

// TODO: Promise.map
export default isAuthenticated(async (_, { input }, ctx) => {
  try {
    return Promise.all(
      input.map(async file => {
        const ext = getExtensionType(file.filename)
        const type = getContentType(ext)
        const id = v4()
        const filename = `${id}.${ext}`

        try {
          const params = {
            Bucket: AWS_S3_BUCKET,
            ContentType: type,
            Key: filename,
          }

          const url = await s3.getSignedUrl('putObject', params)

          return { url, type, id, filename }
        } catch (err) {
          debug('‰O', err)
        }
      })
    )
  } catch (err) {
    debug('‰O', err)
  }
})
