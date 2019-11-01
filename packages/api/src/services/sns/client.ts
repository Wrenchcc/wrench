import { SNS } from 'aws-sdk'

const AWS_SNS_REGION = 'us-east-1'

export default new SNS({
  apiVersion: '2010-12-01',
  region: AWS_SNS_REGION,
})
