import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, isAdmin, canModeratePost } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  // await Promise.all([
  //   ctx.redis.delete(`post:filesConnection:${id}:*`),
  //   ctx.redis.delete(`project:cover:${id}`),
  //   ctx.db.File.delete({ postId: id }),
  //   ctx.db.Post.delete(id),
  // ])

  ctx.redis.delete(`post:filesConnection:${id}:*`)
  ctx.redis.delete(`project:cover:${id}`)
  ctx.db.File.delete({ postId: id })
  ctx.db.Post.delete(id)
  ctx.db.PostTranslation.delete({ postId: id })


  return post
})
