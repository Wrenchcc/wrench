import { S3 } from 'aws-sdk'

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const AWS_S3_REGION = 'us-east-1'

export default new S3({
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_S3_REGION,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})
