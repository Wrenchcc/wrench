export default async ({ id }, _, ctx) => {
  try {
    const [_, count] = await ctx.db.Project.findAndCount({ where: { userId: id } })
    return count
  } catch (err) {
    console.log(err)
  }
}
