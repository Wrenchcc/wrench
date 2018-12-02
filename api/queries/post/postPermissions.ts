import { requireAuth } from 'api/utils/permissions'

const defaultPermissions = {
  isOwner: false,
}

export default requireAuth(async ({ id }, args, ctx) => {
  try {
    const { userId } = await ctx.db.Post.findOne(id, {
      select: ['userId'],
    })

    return {
      isOwner: userId === ctx.userId,
    }
  } catch (err) {
    console.log(err)
  }
})
