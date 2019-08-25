import paginate from '../../utils/paginate'

export default async (_, args, ctx) => {
  const project = await ctx.db.Project.findOne(args.id)

  return paginate(ctx.db.Project, args, {
    where: {
      projectTypeId: project.projectTypeId,
    },
  })
}
