export default async ({ modelId }, _, ctx) => {
  const model = await ctx.db.Model.findOne(modelId)
  const brand = await ctx.db.Brand.findOne(model.brandId)

  return {
    ...model,
    model: model.name,
    brand,
  }
}
