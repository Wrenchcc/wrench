import paginate from '../../utils/paginate'

// TODO: Use dataloader
export default async (_, args, ctx) => {
  return paginate(ctx.db.Hashtag, args)
}
