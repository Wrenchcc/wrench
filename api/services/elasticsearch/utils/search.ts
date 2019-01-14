import client from '../client'

export default async ({ body, index }) => {
  try {
    return client.post(`${index}/_search`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.log(err.response)
  }
}
