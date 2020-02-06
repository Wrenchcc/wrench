export default async (_, __, ctx) => {
  const [, totalCount] = await ctx.db.File.findAndCount()

  return totalCount
}
