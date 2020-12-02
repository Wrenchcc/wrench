const { SES } = require('aws-sdk')

const debug = require('debug')('task:sns:delete')

const { AWS_SES_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const template = process.argv[2]

if (!template) {
  debug('You need to specify a template name. `yarn ses:delete welcome`')
} else {
  const params = {
    TemplateName: template,
  }

  const ses = new SES({
    apiVersion: '2010-12-01',
    region: AWS_SES_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  })

  ses.deleteTemplate(params, err => {
    if (err) {
      debug('Could not delete template. %s', err.stack)
    } else {
      debug('Template deleted.')
    }
  })
}
