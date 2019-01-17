export default async ({ userId }, args, ctx) => {
  try {
    return ctx.loaders.user.load(userId)
  } catch (err) {
    console.log(err)
  }
}
