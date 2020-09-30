import { redisDelByPattern, RedisDeletionMethod } from '@eturino/ioredis-del-by-pattern'

const debug = require('debug')('api:redis')

const VERSION = 'v2'

export const get = (client) => async (key) => {
  const cacheKey = `${VERSION}:${key}`

  const cache = await client.get(cacheKey)

  if (cache) {
    debug(`hit: ${cacheKey}`)
    return JSON.parse(cache)
  }

  debug(`miss: ${cacheKey}`)
}

export const remove = (client) => async (key) => {
  const cacheKey = `${VERSION}:${key}`
  debug(`delete: ${cacheKey}`)

  return redisDelByPattern({
    pattern: cacheKey,
    redis: client,
    deletionMethod: RedisDeletionMethod.unlink,
  })
}

export const set = (client) => async (key, data, ttl) => {
  const cacheKey = `${VERSION}:${key}`
  debug(`set: ${cacheKey}`)

  if (ttl) {
    return client.set(cacheKey, JSON.stringify(data), 'ex', ttl)
  }

  return client.set(cacheKey, JSON.stringify(data))
}
