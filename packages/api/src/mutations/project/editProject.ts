import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  const data = {
    ...project,
    commentsDisabled: input.commentsDisabled,
    title: input.title,
    userId: ctx.userId,
  }

  if (input.modelId) {
    const model = await ctx.db.Model.findOne(input.modelId)
    data.model = model
  }

  if (input.projectTypeId) {
    const projectType = await ctx.db.ProjectType.findOne(input.projectTypeId)
    data.projectType = projectType
  }

  await ctx.db.Project.save(data)

  return data
})
