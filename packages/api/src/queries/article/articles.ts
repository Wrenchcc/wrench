import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) =>
  paginate(ctx.db.Article, args, {
    where: {
      publisherId: args.publisherId,
    },
  })
