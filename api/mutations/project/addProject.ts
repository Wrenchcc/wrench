import { requireAuth, canModerateProject } from 'api/utils/permissions'
import { createDynamicLink } from 'api/services/firebase'
import { DYNAMIC_LINK_TYPES } from 'shared/utils/enums'

export default requireAuth(async (_, { input }, ctx) => {
  const model = await ctx.db.Model.findOne(input.modelId)
  const user = await ctx.db.User.findOne(ctx.userId)
  const projectType = await ctx.db.ProjectType.findOne(input.projectTypeId)

  const project = await ctx.db.Project.createProject({
    model,
    projectType,
    title: input.title,
    userId: ctx.userId,
  })

  // TODO: Logo from CDN
  const dynamicLink = await createDynamicLink({
    description: `Follow ${user.fullName} project "${project.title}" on Wrench.`,
    // image: user.avatarUrl,
    path: `project/${project.slug}`,
    title: `Project "${project.title}". By (@${user.username}) • Wrench`,
  })

  await ctx.db.DynamicLink.save({
    type: DYNAMIC_LINK_TYPES.PROJECT,
    typeId: project.id,
    url: dynamicLink,
  })

  return project
})
