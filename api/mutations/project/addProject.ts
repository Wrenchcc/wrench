import { isAuthenticated, canModerateProject } from 'api/utils/permissions'
import { createDynamicLink } from 'api/services/firebase'
import { DYNAMIC_LINK_TYPES } from 'shared/utils/enums'

export default isAuthenticated(async (_, { input }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)

  const project = await ctx.db.Project.createProject({
    modelId: input.modelId,
    projectTypeId: input.projectTypeId,
    title: input.title,
    userId: ctx.userId,
  })

  // TODO: Logo from CDN
  const dynamicLink = await createDynamicLink({
    description: `Follow ${user.fullName} project “${project.title}“ on Wrench.`,
    // image: user.avatarUrl,
    path: `project/${project.slug}`,
    title: `Project “${project.title}“. By (@${user.username}) • Wrench`,
  })

  await ctx.db.DynamicLink.save({
    type: DYNAMIC_LINK_TYPES.PROJECT,
    typeId: project.id,
    url: dynamicLink,
  })

  return project
})
