import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const cacheKey = `commentsConnection:${id}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const resonse = await paginate(ctx.db.Comment, args, {
    where: {
      postId: id,
    },
  })

  ctx.redis.set(cacheKey, resonse)

  return resonse
}
