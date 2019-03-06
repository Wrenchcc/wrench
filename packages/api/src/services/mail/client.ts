import { SES } from 'aws-sdk'

const { APP_AWS_SES_REGION } = process.env

export default new SES({
  apiVersion: '2010-12-01',
  region: APP_AWS_SES_REGION,
})
