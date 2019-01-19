import * as aws4 from 'aws4'
import axios from 'axios'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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

  return axios(signedRequest)
}

// import client from '../client'

// export default async ({ body, index }) => {
//   try {
//     return client.post(`${index}/_search`, body, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   } catch (err) {
//     console.log(err.response)
//   }
// }
