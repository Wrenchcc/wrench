// TODO: Use custom counter
export default async ({ id }, _, ctx) => {
  const count = await ctx.db.Project.findAndCount({ where: { userId: id } })[1]
  return count || 0
}
