export default async (_, args, ctx) => {
  const cacheKey = `hashtag:hashtag:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await ctx.db.Hashtag.findOne({
    where: {
      ...args,
    },
  })

  ctx.redis.set(cacheKey, response)

  return response
}
