import { requireAuth, canModerateProject } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, { id, input }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new UserError('You don’t have permission to manage this project.')
  }

  const model = await ctx.db.Model.findOne(input.modelId)
  const projectType = await ctx.db.ProjectType.findOne(input.projectTypeId)

  return ctx.db.Project.save({
    id: project.id,
    model,
    projectType,
    title: input.title,
    userId: ctx.userId,
  })
})
