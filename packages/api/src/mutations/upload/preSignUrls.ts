import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import getExtFromType from '../../utils/getExtFromType'
import { isAuthenticated } from '../../utils/permissions'

const debug = require('debug')('api:preSignUrls')

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const AWS_S3_BUCKET = 'wrench-files'
const UPLOAD_DIRECTORY = 'images'
const AWS_S3_REGION = 'us-east-1'

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default isAuthenticated(async (_, { input }) => {
  try {
    return Promise.all(
      input.map(async file => {
        const type = getExtFromType(file.type)
        const filename = `${v4()}.${type}`

        try {
          const url = await s3.getSignedUrl('putObject', {
            Bucket: AWS_S3_BUCKET,
            Key: `${UPLOAD_DIRECTORY}/${filename}`,
          })

          const res = {
            url,
            type,
            filename,
          }

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
