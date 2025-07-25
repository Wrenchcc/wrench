import { isAuthenticated } from '../../utils/permissions'
import paginate from '../../utils/paginate'

export default isAuthenticated(async (_, args, ctx) => {
  const projectTypes = await ctx.db.UserInterestedIn.find({
    userId: ctx.userId,
  })

  // TODO: Query only popular projects based on followers and comments latest 7 days
  // Exclude own project
  // If no projects in category exclude
  // And minimum one post
  // TODO: Paginate one type at a time
  return projectTypes.map(async ({ projectTypeId }) => ({
    ...(await paginate(ctx.db.Project, args, {
      where: { projectTypeId },
    })),
    type: await ctx.db.ProjectType.findOne(projectTypeId),
  }))
})
