export default async (_, __, ctx) => {
  const cacheKey = `project:projectTypes`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await ctx.db.ProjectType.find()

  ctx.redis.set(cacheKey, response)

  return response
}
