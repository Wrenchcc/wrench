export default async ({ modelId }, _, ctx) => {
  const cacheKey = `project:model:${modelId}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const model = await ctx.db.Model.findOne(modelId)
  const brand = await ctx.db.Brand.findOne(model.brandId)

  const response = {
    ...model,
    model: model.name,
    brand,
  }

  ctx.redis.set(cacheKey, response)

  return response
}
