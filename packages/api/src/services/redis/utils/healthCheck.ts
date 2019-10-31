import client from '../client'

export default async function healthCheck() {
  const RedisClient = client()

  if (RedisClient.client.status !== 'error') {
    return Promise.resolve()
  }

  return Promise.reject()
}
