import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  if (ctx.userId) {
    const saved = await ctx.db.ArticlePublisherSeen.findOne({
      where: {
        publisherId: args.publisherId,
        userId: ctx.userId,
      },
    })

    if (saved) {
      // NOTE: Update
      await ctx.db.ArticlePublisherSeen.update(saved.id, {
        lastSeen: new Date(),
      })
    } else {
      // NOTE: Save
      await ctx.db.ArticlePublisherSeen.save({
        lastSeen: new Date(),
        publisherId: args.publisherId,
        userId: ctx.userId,
      })
    }
  }

  return paginate(ctx.db.Article, args, {
    where: {
      publisherId: args.publisherId,
    },
  })
}
