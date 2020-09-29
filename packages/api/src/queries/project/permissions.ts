export default async ({ id, userId }, _, ctx) => {
  const response = {
    isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
    isOwner: userId === ctx.userId,
  }

  return response
}
