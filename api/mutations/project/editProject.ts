import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from 'api/utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  let data = {
    commentsDisabled: input.commentsDisabled,
    id: project.id,
    title: input.title,
    userId: ctx.userId,
  }

  if (input.modelId) {
    const model = await ctx.db.Model.findOne(input.modelId)

    data = {
      ...project,
      model,
    }
  }

  if (input.projectTypeId) {
    const projectType = await ctx.db.ProjectType.findOne(input.projectTypeId)

    data = {
      ...project,
      projectType,
    }
  }

  return ctx.db.Project.save(data)
})
