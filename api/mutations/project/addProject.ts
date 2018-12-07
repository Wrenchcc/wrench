import { requireAuth, canModerateProject } from 'api/utils/permissions'
import UserError from 'api/utils/UserError'

export default requireAuth(async (_, { input }, ctx) => {
  const model = await ctx.db.Model.findOne(input.modelId)
  const projectType = await ctx.db.ProjectType.findOne(input.projectTypeId)

  return ctx.db.Project.save({
    model,
    projectType,
    title: input.title,
    userId: ctx.userId,
  })
})
