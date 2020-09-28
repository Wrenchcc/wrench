const debug = require('debug')('api:redis')

const VERSION = 'v1'

export const get = client => async key => {
  const cacheKey = `${VERSION}:${key}`

  const cache = await client.get(cacheKey)

  if (cache) {
    debug(`hit: ${cacheKey}`)
    return JSON.parse(cache)
  }

  debug(`miss: ${cacheKey}`)
}

export const remove = client => async key => {
  const cacheKey = `${VERSION}:${key}`
  debug(`delete: ${cacheKey}`)

  return client.delete(cacheKey)
}

export const set = client => async (key, data, options) => {
  const cacheKey = `${VERSION}:${key}`
  debug(`set: ${cacheKey}`)

  return client.set(cacheKey, JSON.stringify(data), {
    ttl: null,
    ...options,
  })
}
