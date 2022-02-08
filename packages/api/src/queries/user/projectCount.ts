export default async ({ id }, _, ctx) => {
  const { count } = await ctx.db.Project.projectCount(id)

  return count
}
