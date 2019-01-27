import { DYNAMIC_LINK_TYPES } from '../../utils/enums'
import { dynamicLink } from '../../services/firebase'
import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { input }, ctx) => {
  const user = await ctx.db.User.findOne(ctx.userId)

  const project = await ctx.db.Project.createProject({
    modelId: input.modelId,
    projectTypeId: input.projectTypeId,
    title: input.title,
    userId: ctx.userId,
  })

  const url = await dynamicLink({
    description: `Follow ${user.fullName} project “${project.title}“ on Wrench.`,
    image: 'https://s3.us-east-2.amazonaws.com/wrench-files/static/logo/logo@3x.png',
    path: `project/${project.slug}`,
    title: `Project “${project.title}“. By (@${user.username}) • Wrench`,
  })

  await ctx.db.DynamicLink.save({
    type: DYNAMIC_LINK_TYPES.PROJECT,
    typeId: project.id,
    url,
  })

  return project
})
