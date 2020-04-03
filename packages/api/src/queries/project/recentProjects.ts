import paginate from '../../utils/paginate'

export default async (args, ctx) => {
  const where = args.typeId
    ? {
        where: {
          projectTypeId: args.typeId,
        },
      }
    : {}

  return paginate(ctx.db.Project, args, where)
}
