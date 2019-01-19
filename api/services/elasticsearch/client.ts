import * as aws4 from 'aws4'
import axios from 'axios'

const {
  APP_AWS_ACCESS_KEY,
  APP_AWS_SECRET_ACCESS_KEY,
  ELASTICSEARCH_DOMAIN,
  NODE_ENV,
} = process.env

export default async ({ body = null, path, method = 'POST' }) => {
  const options = {
    body: JSON.stringify(body),
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    method: method.toUpperCase(),
    path,
  }

  if (NODE_ENV !== 'production') {
    return axios({
      ...options,
      url: `http://${ELASTICSEARCH_DOMAIN}/${path}`,
    })
  }

  return axios(
    aws4.sign(
      {
        ...options,
        url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
      },
      {
        secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
        accessKeyId: APP_AWS_ACCESS_KEY,
      }
    )
  )
}
