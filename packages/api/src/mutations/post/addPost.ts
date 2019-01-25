import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'
import { FILE_TYPES } from '@wrench/shared/utils/enums'

export default isAuthenticated(async (_, { input }, ctx) => {
  const project = await ctx.db.Project.findOne(input.projectId)

  if (!canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post to this project.')
  }

  const filesToSave = input.files.map(({ filename }) => ({
    filename,
    project,
    type: FILE_TYPES.IMAGE,
    userId: ctx.userId,
  }))

  const files = await ctx.db.File.save(filesToSave)

  return ctx.db.Post.save({
    caption: input.caption,
    files,
    project,
    userId: ctx.userId,
  })
})
