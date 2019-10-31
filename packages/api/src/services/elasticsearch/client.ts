import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

export default async ({ body = null, path, method }) => {
  const options = {
    body,
    data: body,
    url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    path,
    method,
  }

  return axios(options)
}
