import client from '../client'

export default async ({ query, index, type }) => {
  try {
    return client.get(`${index}/_search?q=${query}`)
  } catch (err) {
    console.log(err.response)
  }
}
