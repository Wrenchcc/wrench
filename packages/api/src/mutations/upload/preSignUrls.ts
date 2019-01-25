import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import { isAuthenticated } from '../../utils/permissions'
import { getContentType, getExtensionType } from '../../utils/fileExtensions'

const debug = require('debug')('api:s3')

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

export default isAuthenticated(async (_, { input }, ctx) => {
  try {
    return Promise.all(
      input.map(async file => {
        const ext = getExtensionType(file.filename)
        const type = getContentType(ext)
        const filename = `${v4()}.${ext}`

        try {
          const params = {
            Bucket: APP_AWS_S3_BUCKET,
            ContentType: type,
            Key: filename,
          }

          const url = await s3.getSignedUrl('putObject', params)
          const res = { url, type, filename }

          debug(res, '%O')

          return res
        } catch (err) {
          debug(err)
        }
      })
    )
  } catch (err) {
    debug(err)
  }
})
