import { requireAuth, canModerateComment } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, { id, input }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId)) {
    return new UserError('You don’t have permission to manage this comment.')
  }

  return ctx.db.Post.save({
    ...comment,
    ...input,
  })
})
