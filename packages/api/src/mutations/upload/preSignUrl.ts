import { v4 } from 'uuid'
import { isAuthenticated } from '../../utils/permissions'
import getExtFromType from '../../utils/getExtFromType'

const debug = require('debug')('api:preSignUrl')

const AWS_S3_BUCKET = 'wrench-files'

export default isAuthenticated(async (_, { input }, ctx) => {
  try {
    const type = getExtFromType(input.type)
    const filename = `${v4()}.${type}`

    try {
      const url = await ctx.services.s3.getSignedUrl({
        Bucket: AWS_S3_BUCKET,
        Key: `${input.path}/${filename}`,
      })

      const res = {
        url,
        type,
        filename,
      }

      debug(res, '%O')

      return res
    } catch (err) {
      debug(err)
    }
  } catch (err) {
    debug(err)
  }
})
