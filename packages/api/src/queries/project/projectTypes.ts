import { VehicleTypes } from '../../models/enums'

export default async (_, { type = VehicleTypes.MOTORCYCLE }, ctx) => {
  // const cacheKey = `project:projectTypes:v2`
  // const cache = await ctx.redis.get(cacheKey)

  // if (cache) {
  //   return cache
  // }

  const response = await ctx.db.ProjectType.find({
    type,
  })

  // ctx.redis.set(cacheKey, response)

  return response
}
