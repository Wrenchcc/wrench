export default async ({ id }, _, ctx) => {
  const [__, count] = await ctx.db.Project.findAndCount({ where: { userId: id } })
  return count
}
