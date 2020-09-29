import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { input }, ctx) => {
  const cacheKey1 = `user:projectsConnection:${ctx.userId}:*`
  const cacheKey2 = `user:projectCount:${ctx.userId}:*`

  await Promise.all([ctx.redis.delete(cacheKey1), ctx.redis.delete(cacheKey2)])

  const project = await ctx.db.Project.createProject({
    modelId: input.modelId ? input.modelId : null,
    projectTypeId: input.projectTypeId,
    title: input.title,
    userId: ctx.userId,
  })

  return project
})
