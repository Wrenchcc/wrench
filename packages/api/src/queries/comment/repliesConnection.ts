import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) => {
  const response = await paginate(ctx.db.Comment, args, {
    where: {
      commentId: id,
    },
  })

  return response
}
