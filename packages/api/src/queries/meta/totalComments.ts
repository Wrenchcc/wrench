export default async (_, __, ctx) => {
  const [, totalCount] = await ctx.db.Comment.findAndCount()

  return totalCount
}
