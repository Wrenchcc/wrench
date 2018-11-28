export default async (_, __, ctx) => {
  try {
    return ctx.db.Users.findOne(ctx.userId)
  } catch (err) {
    console.log(err)
  }
}
