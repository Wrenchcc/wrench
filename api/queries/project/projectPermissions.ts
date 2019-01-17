import { isAuthenticated } from 'api/utils/permissions'

export default isAuthenticated(async ({ id, userId }, args, ctx) => ({
  isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
  isOwner: userId === ctx.userId,
}))
