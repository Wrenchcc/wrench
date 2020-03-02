import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateComment, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  await Promise.resolve([
    ctx.db.Comment.delete(id),
    // NOTE: Delete replies
    ctx.db.Comment.delete({
      commentId: id,
    }),
  ])

  return true
})
