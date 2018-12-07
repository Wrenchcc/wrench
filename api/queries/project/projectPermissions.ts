import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async ({ id }, args, ctx) => {
  try {
    const project = await ctx.db.Project.findOne(id)
    return {
      isFollower: await ctx.db.Following.isFollower(ctx.userId, id),
      isOwner: project.userId === ctx.userId,
    }
  } catch (err) {
    console.log(err)
  }
})
