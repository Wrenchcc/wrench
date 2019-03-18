import axios from 'axios'
import { S3 } from 'aws-sdk'

const { AWS_S3_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const UPLOAD_DIRECTORY = 'avatar'

const s3 = new S3({
  region: AWS_S3_REGION,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

export default async (userId, fbId) => {
  try {
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
    console.log(err)
  }
}
