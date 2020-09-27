import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const cacheKey = `commentsConnection:${id}`
  const cache = JSON.parse(await ctx.redis.get(cacheKey))

  if (cache) {
    return cache
  }

  const resonse = await paginate(ctx.db.Comment, args, {
    where: {
      postId: id,
    },
  })

  ctx.redis.set(cacheKey, JSON.stringify(resonse))

  return resonse
}
