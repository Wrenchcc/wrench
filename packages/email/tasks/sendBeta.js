const fs = require('fs')
const { SES } = require('aws-sdk')

const debug = require('debug')('task:sns:beta')

const { AWS_SES_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

const basePath = `${__dirname}/../src`

const fixtures = fs.readFileSync(`${basePath}/beta/fixtures.json`, 'utf8')
const subscribers = fs.readFileSync(`${basePath}/beta/subscribers.json`, 'utf8')

const ses = new SES({
  apiVersion: '2010-12-01',
  region: AWS_SES_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

function sendEmailWithDelay(email) {
  setTimeout(async () => {
    // await ses
    //   .sendTemplatedEmail({
    //     Source: 'Wrench <beta@wrench.cc>',
    //     Template: 'beta',
    //     Destination: {
    //       ToAddresses: [email],
    //     },
    //     TemplateData: fixtures,
    //   })
    //   .promise()
  }, 50)
}

JSON.parse(subscribers).map(email => {
  try {
    sendEmailWithDelay(email)
    debug('Successfully sent message to: %s', email)
  } catch (err) {
    debug('Error sending message: %o', err)
  }
})
