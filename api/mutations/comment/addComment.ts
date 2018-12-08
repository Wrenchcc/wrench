import { requireAuth } from 'api/utils/permissions'

export default requireAuth(async (_, { postId, commentId, input }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)

  return ctx.db.Comment.save({
    commentId,
    postId,
    text: input.text,
    user,
  })
})
