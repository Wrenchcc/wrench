import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async ({ id, userId }, _, ctx) => ({
  isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
  isOwner: userId === ctx.userId,
}))
