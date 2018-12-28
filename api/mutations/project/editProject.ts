import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'

export default requireAuth(async (_, { id, input }, ctx) => {
  const project = await ctx.db.Project.findOne(id)

  if (!(await canModerateProject(project, ctx.userId))) {
    return new ForbiddenError('You don’t have permission to manage this project.')
  }

  let data = {
    commentsDisabled: input.commentsDisabled,
    id: project.id,
    isPrivate: input.isPrivate,
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

  await ctx.db.Project.save(data)

  return ctx.db.Project.findOne(id)
})
