import * as aws4 from 'aws4'
import axios from 'axios'

const { ELASTICSEARCH_DOMAIN, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env

console.log(AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY)

export default async ({ body = null, path, method = 'POST' }) => {
  const options = {
    body,
    data: body,
    url: `https://${ELASTICSEARCH_DOMAIN}/${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    host: ELASTICSEARCH_DOMAIN,
    method: method.toUpperCase(),
    path,
  }

  // if (NODE_ENV !== 'production') {
  //   return axios({
  //     ...options,
  //     url: `http://${ELASTICSEARCH_DOMAIN}/${path}`,
  //   })
  // }

  return axios(
    aws4.sign(options, {
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      accessKeyId: AWS_ACCESS_KEY,
    })
  )
}
