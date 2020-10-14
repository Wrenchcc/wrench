import paginate from '../../utils/paginate'

// Exlude current project and projects that user follows
// Random sort
export default async (_, args, ctx) => {
  const project = await ctx.db.Project.findOne(args.id)
  const cacheKey = `project:similarProjects:${project.projectTypeId}:${args.after}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const response = await paginate(
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

  ctx.redis.set(cacheKey, response, 604800)

  return response
}
