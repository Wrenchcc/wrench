export default async ({ id }, _, ctx) => {
  const cacheKey = `user:projectCount:${id}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const { count } = await ctx.db.Project.projectCount(id)

  ctx.redis.set(cacheKey, count)

  return count
}
