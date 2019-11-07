import { v4 } from 'uuid'
import getExtFromType from '../../utils/getExtFromType'
import { isAuthenticated } from '../../utils/permissions'
import S3 from '../../services/s3/client'

const debug = require('debug')('api:preSignUrl')

const AWS_S3_BUCKET = 'wrench-files'

export default isAuthenticated(async (_, { input }) => {
  try {
    const type = getExtFromType(input.type)
    const filename = `${v4()}.${type}`

    try {
      const url = await S3.getSignedUrl('putObject', {
        Bucket: AWS_S3_BUCKET,
        Key: `${input.path}/${filename}`,
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
  } catch (err) {
    debug(err)
  }
})
