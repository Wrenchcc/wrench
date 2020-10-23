import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) => {
  // const cacheKey = `comment:repliesConnection:${id}:${JSON.stringify(args)}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const response = await paginate(ctx.db.Comment, args, {
    where: {
      commentId: id,
    },
  })

  // ctx.redis.set(cacheKey, response)

  return response
}
