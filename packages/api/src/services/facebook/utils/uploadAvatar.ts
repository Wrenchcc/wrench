import axios from 'axios'
import s3 from '../../s3/client'

const debug = require('debug')('api:uploadAvatar')

const AWS_S3_BUCKET = 'wrench-files'
const UPLOAD_DIRECTORY = 'avatar'

export default async (userId, fbId, isSilhouette) => {
  try {
    if (isSilhouette) {
      return
    }

    const avatar = await axios.get(
      `https://graph.facebook.com/${fbId}/picture?type=large&width=720&height=7206&access_token=1174076712654826|0cb59e486f2c717d1ad136fafca3a43d`,
      { responseType: 'arraybuffer' }
    )

    return s3
      .upload({
        Body: avatar.data,
        Bucket: AWS_S3_BUCKET,
        Key: `${UPLOAD_DIRECTORY}/${userId}.jpg`,
      })
      .promise()
  } catch (err) {
    debug(err)
  }
}
