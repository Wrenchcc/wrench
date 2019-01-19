import * as aws4 from 'aws4'
import axios from 'axios'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { APP_AWS_ACCESS_KEY, APP_AWS_SECRET_ACCESS_KEY, ELASTICSEARCH_URL } = process.env

export default async ({ body, index }) => {
  try {
    await axios(
      aws4.sign(
        {
          host: process.env.ELASTICSEARCH_URL,
          method: 'PUT',
          url: `https://${process.env.ELASTICSEARCH_URL}/recipes`,
          path: 'recipes',
        },
        { secretAccessKey: APP_AWS_SECRET_ACCESS_KEY, accessKeyId: APP_AWS_ACCESS_KEY }
      )
    )
  } catch (err) {
    console.log(err)
  }

  // const signedRequest = aws4.sign(
  //   {
  //     host: ELASTICSEARCH_URL,
  //     method: 'POST',
  //     url: `${ELASTICSEARCH_URL}/${index}/_search`,
  //     data: body,
  //     body: JSON.stringify(body),
  //     path: `/${index}/_search`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  //   {
  // secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
  // accessKeyId: APP_AWS_ACCESS_KEY,
  //   }
  // )
  //
  // console.log(signedRequest)
  //
  // try {
  //   const blah = await axios(signedRequest)
  //
  //   return blah
  // } catch (err) {
  //   console.log(err)
  // }
}
