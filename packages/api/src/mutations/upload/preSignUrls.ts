import { v4 } from 'uuid'
import { getExtFromType, getDirectory } from '../../utils/getExtFromType'
import { isAuthenticated } from '../../utils/permissions'

const debug = require('debug')('api:preSignUrls')

const AWS_S3_BUCKET = 'wrench-files'

export default isAuthenticated(async (_, { input }, ctx) => {
  try {
    return Promise.all(
      input.map(async (file) => {
        const type = getExtFromType(file.type)
        const directory = getDirectory(file.type)
        const filename = `${v4()}.${type}`

        try {
          const url = await ctx.services.s3.client.getSignedUrl('putObject', {
            Bucket: AWS_S3_BUCKET,
            Key: `${directory}/${filename}`,
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
