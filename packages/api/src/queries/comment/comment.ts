export default async (_, { id }, ctx) => {
  const cacheKey = `comment:comment:${id}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await ctx.db.Comment.findOne(id)

  ctx.redis.set(cacheKey, response)

  return response
}
