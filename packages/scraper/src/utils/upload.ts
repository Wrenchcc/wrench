import axios from 'axios'
import { S3 } from 'aws-sdk'

const { AWS_S3_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const UPLOAD_DIRECTORY = 'articles'

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})

export default async url => {
  try {
    const image = await axios.get(url, {
      responseType: 'arraybuffer',
    })

    const id = 123

    return s3
      .upload({
        Body: image.data,
        Bucket: AWS_S3_BUCKET,
        Key: `${UPLOAD_DIRECTORY}/${id}.jpg`,
      })
      .promise()
  } catch (err) {
    debug(err)
  }
}
