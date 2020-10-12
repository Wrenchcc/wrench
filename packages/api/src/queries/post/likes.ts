export default async ({ id }, _, ctx) => {
  // const cacheKey = `post:likes:${id}:${ctx.userId}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const [, totalCount] = await ctx.db.Like.findAndCount({ typeId: id })

  const response = {
    isLiked: await ctx.db.Like.isLiked(ctx.userId, id),
    totalCount,
  }

  // ctx.redis.set(cacheKey, response)

  return response
}
