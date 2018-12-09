import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async ({ id, userId }, args, ctx) => {
  try {
    return {
      isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
      isOwner: userId === ctx.userId,
    }
  } catch (err) {
    console.log(err)
  }
})
