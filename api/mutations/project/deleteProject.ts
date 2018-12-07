import { requireAuth, canModerateProject } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, { id }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new UserError('You don’t have permission to manage this project.')
  }

  await ctx.db.Project.delete(id)

  return true
})
