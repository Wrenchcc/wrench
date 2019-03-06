import { SNS } from 'aws-sdk'

const { APP_AWS_SNS_REGION } = process.env

export default new SNS({
  apiVersion: '2010-12-01',
  region: APP_AWS_SNS_REGION,
})
