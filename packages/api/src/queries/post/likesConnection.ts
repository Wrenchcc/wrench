import { In } from 'typeorm'
import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async ({ id }, args, ctx) => {
  const cacheKey = `likesConnection:${id}`
  const cache = JSON.parse(await ctx.redis.get(cacheKey))

  if(cache) {
    return cache
  }

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

  ctx.redis.set(cacheKey, JSON.stringify(response))

  return response
}
