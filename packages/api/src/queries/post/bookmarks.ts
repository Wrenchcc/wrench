export default async ({ id }, _, ctx) => {
  const [, totalCount] = await ctx.db.Bookmark.findAndCount({ postId: id })

  const response = {
    isBookmarked: await ctx.db.Bookmark.isBookmarked(ctx.userId, id),
    totalCount,
  }

  return response
}
