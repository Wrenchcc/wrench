import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) => {
  const cacheKey = `user:projectsConnection:${id}:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await paginate(ctx.db.Project, args, {
    where: {
      userId: id,
    },
  })

  ctx.redis.set(cacheKey, response)

  return response
}
