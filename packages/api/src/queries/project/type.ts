export default async ({ projectTypeId }, _, ctx) => {
  const cacheKey = `project:type:${projectTypeId}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await ctx.db.ProjectType.findOne(projectTypeId)

  ctx.redis.set(cacheKey, response)

  return response
}
