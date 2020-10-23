import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const [isBookmarked, post] = await Promise.all([
    ctx.db.Bookmark.isBookmarked(ctx.userId, id),
    ctx.db.Post.findOne(id),
    // ctx.redis.delete(`post:bookmarks:${id}:${ctx.userId}`),
  ])

  if (isBookmarked) {
    await ctx.db.Bookmark.delete({ postId: id, userId: ctx.userId })
  } else {
    await ctx.db.Bookmark.save({ postId: id, userId: ctx.userId })
  }

  return post
})
