export default async ({ userId }, _, ctx) => {
  return ctx.loaders.user.load(userId)
}
