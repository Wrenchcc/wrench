import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  return paginate(ctx.db.File, args)
}
