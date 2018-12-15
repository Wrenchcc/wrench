export default async ({ id }, _, ctx) => {
  try {
    const [__, count] = await ctx.db.Project.findAndCount({ where: { userId: id } })
    return count
  } catch (err) {
    console.log(err)
  }
}
