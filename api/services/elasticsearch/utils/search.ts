import client from '../client'

export default async query => {
  try {
    return client.get('vehicles/_search?q=bmw')
  } catch (err) {
    console.log(err.response)
  }
}
