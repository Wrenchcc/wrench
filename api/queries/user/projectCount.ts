export default async ({ id }, _, ctx) => {
  try {
    return ctx.db.Project.getCountByUserId(id)
  } catch (err) {
    console.log(err)
  }
}
