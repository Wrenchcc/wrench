import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'

export default requireAuth(async (_, { id, input }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new ForbiddenError('You don’t have permission to manage this project.')
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
