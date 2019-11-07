import { v4 } from 'uuid'
import getExtFromType from '../../utils/getExtFromType'
import { isAuthenticated } from '../../utils/permissions'
import S3 from '../../services/s3/client'

const debug = require('debug')('api:preSignUrls')

const AWS_S3_BUCKET = 'wrench-files'
const UPLOAD_DIRECTORY = 'images'

export default isAuthenticated(async (_, { input }) => {
  try {
    return Promise.all(
      input.map(async file => {
        const type = getExtFromType(file.type)
        const filename = `${v4()}.${type}`

        try {
          const url = await S3.getSignedUrl('putObject', {
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
