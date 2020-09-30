import paginate from '../../utils/paginate'

// Exlude current project and projects that user follows
// Random sort
export default async (_, args, ctx) => {
  const cacheKey = `project:similarProjects:${JSON.stringify(args)}`
  const cache = await ctx.redis.get(cacheKey)

  if (cache) {
    return cache
  }

  const project = await ctx.db.Project.findOne(args.id)

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
