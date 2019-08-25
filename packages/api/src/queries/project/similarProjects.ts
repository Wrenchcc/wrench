import paginate from '../../utils/paginate'

// Exlude current project and projects that user follows
// Random sort
export default async (_, args, ctx) => {
  const project = await ctx.db.Project.findOne(args.id)

  return paginate(
    ctx.db.Project,
    args,
    {
      where: {
        projectTypeId: project.projectTypeId,
      },
    },
    {
      column: 'createdAt',
      sort: 'ASC',
    }
  )
}
