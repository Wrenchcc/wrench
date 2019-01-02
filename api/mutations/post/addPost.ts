import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'
import { FILE_TYPES } from 'shared/utils/enums'

// TODO: Check if filename excists and ForbiddenError
export default requireAuth(async (_, { input }, ctx) => {
  const project = await ctx.db.Project.findOne(input.projectId)

  if (!canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post to this project.')
  }

  // TODO: Check if files
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
