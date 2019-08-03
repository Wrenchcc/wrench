// TODO: Use dataloader
export default async (_, args, ctx) =>
  ctx.db.ArticlePublisher.findOne({
    where: {
      ...args,
    },
  })
