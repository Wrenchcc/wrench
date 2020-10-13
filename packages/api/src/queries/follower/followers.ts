import { In } from 'typeorm'
import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  // const cacheKey = `follower:followers:${args.projectId}:${JSON.stringify(args)}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const followers = await ctx.db.Following.find({
    where: {
      projectId: args.projectId,
    },
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
