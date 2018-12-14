import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateComment } from 'api/utils/permissions'

export default requireAuth(async (_, { id, input }, ctx) => {
  const comment = await ctx.db.Comment.findOne(id)

  if (!canModerateComment(comment, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this comment.')
  }

  return ctx.db.Comment.save({
    ...comment,
    ...input,
  })
})
