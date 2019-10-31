import axios from 'axios'

const { ELASTICSEARCH_DOMAIN } = process.env

export default async ({ body = null, path }) => {
  const options = {
    body,
    data: body,
    url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    path,
  }

  return axios({
    ...options,
    method: 'post',
  })
}
