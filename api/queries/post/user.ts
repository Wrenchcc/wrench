export default async ({ userId }, args, ctx) => ctx.loaders.user.load(userId)
