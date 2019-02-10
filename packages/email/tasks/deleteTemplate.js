const { SES } = require('aws-sdk')

const debug = require('debug')('task:sns:delete')

const { AWS_SNS_REGION } = process.env

const template = process.argv[2]

if (!template) {
  debug('You need to specify a template name. `yarn ses:delete welcome`')
} else {
  const params = {
    TemplateName: template,
  }

  const ses = new SES({
    apiVersion: '2010-12-01',
    region: AWS_SNS_REGION,
  })

  ses.deleteTemplate(params, err => {
    if (err) {
      debug('Could not delete template. %s', err.stack)
    } else {
      debug('Template deleted.')
    }
  })
}
