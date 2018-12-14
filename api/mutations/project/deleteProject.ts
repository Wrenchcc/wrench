import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'

export default requireAuth(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  await ctx.db.Project.delete(id)

  return true
})
