import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) => {
  // const cacheKey = `project:followersConnection:${id}:${JSON.stringify(args)}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const followers = await ctx.db.Following.find({
    projectId: id,
  })

  const ids = followers.map(({ userId }) => userId)

  const response = await paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  // ctx.redis.set(cacheKey, response)

  return response
}
