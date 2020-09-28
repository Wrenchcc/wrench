export default async ({ id }, _, ctx) => {
  const cacheKey = `post:bookmarks:${id}:${ctx.userId}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const [, totalCount] = await ctx.db.Bookmark.findAndCount({ postId: id })

  const response = {
    isBookmarked: await ctx.db.Bookmark.isBookmarked(ctx.userId, id),
    totalCount,
  }

  ctx.redis.set(cacheKey, response)

  return response
}
