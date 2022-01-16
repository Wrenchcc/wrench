import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateComment, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  ctx.db.CommentTranslation.delete({ commentId: id })

  return ctx.db.Comment.save({
    ...comment,
    ...input,
  })
})
