// TODO: Use dataloader
export default async (_, args, ctx) =>
  ctx.db.Hashtag.findOne({
    where: {
      ...args,
    },
  })
