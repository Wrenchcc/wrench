import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { input }, ctx) => {
  const project = await ctx.db.Project.createProject({
    modelId: input.modelId ? input.modelId : null,
    projectTypeId: input.projectTypeId,
    title: input.title,
    userId: ctx.userId,
  })

  return project
})
