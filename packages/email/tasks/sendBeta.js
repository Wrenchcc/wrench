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

const waitFor = ms => new Promise(r => setTimeout(r, ms))

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

asyncForEach(JSON.parse(subscribers), async email => {
  try {
    await waitFor(50)

    await ses
      .sendTemplatedEmail({
        Source: 'Wrench <no-reply@wrench.cc>',
        Template: 'beta',
        Destination: {
          ToAddresses: [email],
        },
        TemplateData: fixtures,
      })
      .promise()

    debug('Successfully sent message to: %s', email)
  } catch (err) {
    debug('Error sending message: %o', err)
  }
})
