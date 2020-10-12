import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  // const cacheKey = `post:likesConnection:${id}:${JSON.stringify(args)}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const users = await ctx.db.Like.find({
    where: {
      typeId: id,
    },
  })

  const ids = users.map(({ userId }) => userId)

  const response = await paginate(ctx.db.User, args, {
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  // ctx.redis.set(cacheKey, response)

  return response
}
