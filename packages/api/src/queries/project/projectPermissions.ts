export default async ({ id, userId }, _, ctx) => ({
  isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
  isOwner: userId === ctx.userId,
})
