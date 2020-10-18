import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const response = await paginate(ctx.db.File, args)

  return response
}
