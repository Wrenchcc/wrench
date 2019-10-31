import axios from 'axios'
import https from 'https'

const debug = require('debug')('api:service:elasticsearch')

const { ELASTICSEARCH_DOMAIN, NODE_ENV } = process.env

export default async ({ body = null, path, method }) => {
  try {
    let httpsAgent

    if (NODE_ENV !== 'production') {
      httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      })
    }

    const options = {
      body,
      data: body,
      url: `${ELASTICSEARCH_DOMAIN}/${path}`,
      headers: {
        'Content-Type': 'application/json',
      },
      host: ELASTICSEARCH_DOMAIN,
      path,
      method,
      httpsAgent,
    }

    await axios({
      ...options,
      url: `${ELASTICSEARCH_DOMAIN}/${path}`,
    })
  } catch (err) {
    debug(err)
  }
}
