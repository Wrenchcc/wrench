import { In } from 'typeorm'

export default async ({ id }, _, ctx) => {
  // const cacheKey = `user:interestedIn:${id}`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const interestedIn = await ctx.db.UserInterestedIn.find({
    userId: id,
  })

  const ids = interestedIn.map(({ projectTypeId }) => projectTypeId)

  const projectTypes = await ctx.db.ProjectType.find({
    where: {
      id: ids.length ? In(ids) : null,
    },
  })

  const response = projectTypes.length > 0 ? projectTypes : null

  // ctx.redis.set(cacheKey, response)

  return response
}
