import * as aws4 from 'aws4'
import axios from 'axios'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { ELASTICSEARCH_URL } = process.env

export default async ({ body, index }) => {
  const signedRequest = aws4.sign({
    host: ELASTICSEARCH_URL,
    method: 'POST',
    url: `${ELASTICSEARCH_URL}/${index}/_search`,
    data: body,
    body: JSON.stringify(body),
    path: `/${index}/_search`,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    return axios(signedRequest)
  } catch (err) {
    console.log(err)
  }
}
