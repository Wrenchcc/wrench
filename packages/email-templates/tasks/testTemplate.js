const fs = require('fs')
const { SES } = require('aws-sdk')

const debug = require('debug')('task:sns:test')

const { AWS_SES_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const template = process.argv[2]
const email = process.argv[3]
const basePath = `${__dirname}/../src`

if (!email) {
  debug('You need to specify a email. `yarn ses:test welcome example@example.com`')
  return
}

if (!template) {
  debug('You need to specify a template name. `yarn ses:test welcome`')
} else {
  const fixtures = fs.readFileSync(`${basePath}/${template}/fixtures.json`, 'utf8')

  const ses = new SES({
    apiVersion: '2010-12-01',
    region: AWS_SES_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  })

  const message = {
    Source: 'Wrench <no-reply@wrench.cc>',
    Template: template,
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: fixtures,
  }

  ses.sendTemplatedEmail(message, (error) => {
    if (error) {
      debug('Error sending message: %o', error.stack)
    } else {
      debug('Successfully sent message: %o', message)
    }
  })
}
