import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateComment } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  await ctx.db.Comment.delete(id)

  return true
})
