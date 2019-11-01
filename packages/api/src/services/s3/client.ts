import { S3 } from 'aws-sdk'

const AWS_S3_REGION = 'us-east-1'

export default new S3({
  region: AWS_S3_REGION,
  signatureVersion: 'v4',
  useAccelerateEndpoint: true,
})
