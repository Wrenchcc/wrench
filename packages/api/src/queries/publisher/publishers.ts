import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) =>
  paginate(ctx.db.ArticlePublisher, args, null, {
    column: 'updatedAt',
    sort: 'DESC',
  })
