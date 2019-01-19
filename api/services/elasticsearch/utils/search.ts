import * as aws4 from 'aws4'
import axios from 'axios'

const { APP_AWS_ACCESS_KEY, APP_AWS_SECRET_ACCESS_KEY, ELASTICSEARCH_DOMAIN } = process.env

export default async ({ body, index }) => {
  const signedRequest = aws4.sign(
    {
      host: ELASTICSEARCH_DOMAIN,
      method: 'POST',
      url: `https://${ELASTICSEARCH_DOMAIN}/${index}/_search`,
      data: body,
      body: JSON.stringify(body),
      path: `${index}/_search`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {
      secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
      accessKeyId: APP_AWS_ACCESS_KEY,
    }
  )

  return axios(signedRequest)
}
