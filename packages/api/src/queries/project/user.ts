export default async ({ userId }, _, ctx) => {
  try {
    return ctx.loaders.user.load(userId)
  } catch (err) {
    console.log(err)
  }
}
