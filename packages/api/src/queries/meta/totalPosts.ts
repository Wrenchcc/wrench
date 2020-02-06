export default async (_, __, ctx) => {
  const [, totalCount] = await ctx.db.Post.findAndCount()

  return totalCount
}
