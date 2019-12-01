import paginate from '../../utils/paginate'

export default async (args, ctx) => {
  return paginate(
    ctx.db.Project,
    args,
    {
      where: {
        projectTypeId: args.typeId,
      },
    },
    {
      column: 'createdAt',
      sort: 'ASC',
    }
  )
}
