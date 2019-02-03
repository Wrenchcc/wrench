import * as Email from 'email-templates'
import * as path from 'path'
import { SES } from 'aws-sdk'

const { APP_AWS_SNS_REGION } = process.env

export default new Email({
  message: {
    from: 'no-reply@wrench.cc',
  },
  views: {
    root: path.join(__dirname, 'templates'),
    options: {
      extension: 'ejs',
    },
  },
  send: true,
  transport: {
    SES: new SES({
      apiVersion: '2010-12-01',
      region: APP_AWS_SNS_REGION,
    }),
  },
})
