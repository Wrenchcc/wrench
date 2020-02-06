export default async (_, __, ctx) => {
  const [, totalCount] = await ctx.db.User.findAndCount()

  return totalCount
}
