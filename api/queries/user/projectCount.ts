export default async ({ id }, _, ctx) => {
  try {
    // return ctx.db.Project.getCountByUserId(id)
    return 1
  } catch (err) {
    console.log(err)
  }
}
