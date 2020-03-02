import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!canModerateProject(project, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  await ctx.db.Project.delete(id)

  return true
})
