import paginate from '../../utils/paginate'

export default async ({ id }, args, ctx) =>
  paginate(ctx.db.Project, args, {
    where: {
      userId: id,
    },
  })
