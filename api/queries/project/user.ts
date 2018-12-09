export default async ({ userId }, args, ctx) => {
  try {
    return ctx.db.User.findOne(userId)
  } catch (err) {
    console.log(err)
  }
}
