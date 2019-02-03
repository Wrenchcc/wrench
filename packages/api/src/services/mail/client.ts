import { SES } from 'aws-sdk'

const { APP_AWS_ACCESS_KEY, APP_AWS_SNS_REGION, APP_AWS_SECRET_ACCESS_KEY } = process.env

export default new SES({
  apiVersion: '2010-12-01',
  region: APP_AWS_SNS_REGION,
  accessKeyId: APP_AWS_ACCESS_KEY,
  secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
})
