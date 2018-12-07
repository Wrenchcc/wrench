import { requireAuth, canModeratePost } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, args, ctx) => {
  if (!(await canModeratePost(ctx.userId, args.id, ctx.db.Post))) {
    return new UserError('You don’t have permission to manage this post.')
  }

  await ctx.db.Post.delete(args.id)

  return true
})
