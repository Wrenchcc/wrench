import { RedisClusterCache, RedisCache } from 'apollo-server-cache-redis'

const { REDIS_HOST, REDIS_PORT, NODE_ENV } = process.env

const CACHE_PREFIX = 'api-cache:'

export default function redis() {
  if (NODE_ENV !== 'production') {
    return new RedisCache({
      host: REDIS_HOST,
      port: REDIS_PORT,
      prefix: CACHE_PREFIX,
    })
  }

  return new RedisClusterCache([
    {
      host: REDIS_HOST,
      port: REDIS_PORT,
      prefix: CACHE_PREFIX,
    },
  ])
}
