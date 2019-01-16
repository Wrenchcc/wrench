export default async ({ userId }, args, ctx) => {
  try {
    return ctx.loaders.userLoader.load(userId)
  } catch (err) {
    console.log(err)
  }
}
