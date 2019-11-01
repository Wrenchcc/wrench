import { SES } from 'aws-sdk'

const AWS_SES_REGION = 'us-east-1'

export default new SES({
  apiVersion: '2010-12-01',
  region: AWS_SES_REGION,
})
