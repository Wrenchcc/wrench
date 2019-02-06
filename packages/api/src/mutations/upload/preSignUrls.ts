import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import { isAuthenticated } from '../../utils/permissions'
import { getContentType, getExtensionType } from '../../utils/fileExtensions'

const debug = require('debug')('api:s3')

const { AWS_S3_REGION, AWS_S3_BUCKET } = process.env

const s3 = new S3({
  region: AWS_S3_REGION,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default isAuthenticated(async (_, { input }) => {
  try {
    return Promise.all(
      input.map(async file => {
        const ext = getExtensionType(file.filename)
        const type = getContentType(ext)
        const filename = `${v4()}.${ext}`

        try {
          const params = {
            Bucket: AWS_S3_BUCKET,
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
