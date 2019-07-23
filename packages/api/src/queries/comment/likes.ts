export default async ({ id }, _, ctx) => {
  const [, totalCount] = await ctx.db.Like.findAndCount({ typeId: id })

  return {
    isLiked: await ctx.db.Like.isLiked(ctx.userId, id),
    totalCount,
  }
}
