import axios from 'axios'
import { S3 } from 'aws-sdk'

const debug = require('debug')('api:uploadAvatar')

const AWS_S3_BUCKET = 'wrench-files'
const AWS_S3_REGION = 'us-east-1'
const UPLOAD_DIRECTORY = 'avatar'

const s3 = new S3({
  region: AWS_S3_REGION,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default async (userId, avatarUrl, isSilhouette) => {
  try {
    if (isSilhouette) {
      return
    }

    const avatar = await axios.get(`${avatarUrl}?sz=720`, {
      responseType: 'arraybuffer',
    })

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
