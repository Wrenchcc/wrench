import https from 'https'

const WEBHOOK_URL = 'services/TA6GL8FMF/B011T1DV8FM/O4crYrGKuCdRP27VRySTXYG2'

export default args => {
  return new Promise((resolve, reject) => {
    if (!args) {
      reject('ERR: Missing configuration')
      return
    }
    if (!args.webhookUrl) {
      reject('ERR: Missing webhookUrl')
      return
    }
    if (!args.data || !args.data.text) {
      reject('ERR: Missing message')
      return
    }

    const data = JSON.stringify({
      text: args.data.text,
    })

    const options = {
      hostname: 'hooks.slack.com',
      port: 443,
      path: WEBHOOK_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }
    const req = https.request(options, res =>
      res.statusCode === 200 ? resolve('OK') : reject(`ERR: ${res.statusCode}`)
    )

    req.write(data)
    req.end()
  })
}
