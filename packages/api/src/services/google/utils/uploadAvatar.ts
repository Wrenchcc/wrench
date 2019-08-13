import axios from 'axios'
import { S3 } from 'aws-sdk'

const debug = require('debug')('api:uploadAvatar')

const { AWS_S3_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const UPLOAD_DIRECTORY = 'avatar'

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
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

    console.log(avatar)

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
