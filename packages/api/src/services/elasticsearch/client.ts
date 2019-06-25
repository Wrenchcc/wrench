import * as aws4 from 'aws4'
import axios from 'axios'

const { ELASTICSEARCH_DOMAIN, NODE_ENV } = process.env

export default async ({ body = null, path }) => {
  const options = {
    data: body,
    url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    path,
    method: 'POST',
  }

  if (NODE_ENV !== 'production') {
    return axios({
      ...options,
      url: `http://${ELASTICSEARCH_DOMAIN}/${path}`,
      method: 'POST',
    })
  }

  return axios(aws4.sign(options))
}
