const fs = require('fs')
const { SES } = require('aws-sdk')

const debug = require('debug')('task:sns:create')

const { APP_AWS_ACCESS_KEY, APP_AWS_SNS_REGION, APP_AWS_SECRET_ACCESS_KEY } = process.env

const template = process.argv[2]
const basePath = `${__dirname}/../src`

if (!template) {
  debug('You need to specify a template name. `yarn ses:create welcome`')
} else {
  const config = require(`${basePath}/${template}/config.json`) // eslint-disable-line
  const html = fs.readFileSync(`${basePath}/${template}/index.html`, 'utf8')

  const params = {
    Template: {
      TemplateName: template,
      ...config,
      HtmlPart: html,
    },
  }

  const ses = new SES({
    apiVersion: '2010-12-01',
    region: APP_AWS_SNS_REGION,
    accessKeyId: APP_AWS_ACCESS_KEY,
    secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
  })

  ses.createTemplate(params, err => {
    if (err) {
      debug('Could not create template.')
    } else {
      debug('Template created.')
    }
  })
}
