export default async ({ userId }, _, ctx) => ctx.loaders.user.load(userId)
