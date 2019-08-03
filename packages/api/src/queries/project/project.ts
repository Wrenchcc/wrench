// TODO: Use dataloader
export default async (_, args, ctx) =>
  ctx.db.Project.findOne({
    where: {
      ...args,
    },
  })
