import client from '../client'

export default async query => {
  try {
    return client.get(`vehicles/_search?q=${query}`)
  } catch (err) {
    console.log(err.response)
  }
}
