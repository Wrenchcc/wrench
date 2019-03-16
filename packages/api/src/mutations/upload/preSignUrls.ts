import { S3 } from 'aws-sdk'
import { v4 } from 'uuid'
import getExtFromType from '../../utils/getExtFromType'
import { isAuthenticated } from '../../utils/permissions'

const debug = require('debug')('api:s3')

const { AWS_S3_REGION, AWS_S3_BUCKET } = process.env

const UPLOAD_DIRECTORY = 'images'

const s3 = new S3({
  region: AWS_S3_REGION,
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
