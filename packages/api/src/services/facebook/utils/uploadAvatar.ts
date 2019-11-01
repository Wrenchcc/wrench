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
      `https://graph.facebook.com/${fbId}/picture?type=large&width=720&height=720`,
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
