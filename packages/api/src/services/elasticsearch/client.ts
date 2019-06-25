import * as aws4 from 'aws4'
import axios from 'axios'

const { ELASTICSEARCH_DOMAIN, NODE_ENV } = process.env

export default async ({ body = null, path }) => {
  const options = {
    body,
    data: body,
    url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    method: 'POST',
    path,
  }

  if (NODE_ENV !== 'production') {
    return axios({
      ...options,
      method: 'POST',
      url: `http://${ELASTICSEARCH_DOMAIN}/${path}`,
    })
  }

  return axios(aws4.sign(options))
}
