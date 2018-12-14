import { ForbiddenError } from 'apollo-server-express'
import { requireAuth, canModerateProject } from 'api/utils/permissions'

const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
}

// TODO: Check if filename excists and ForbiddenError
export default requireAuth(async (_, { input }, ctx) => {
  const project = await ctx.db.Project.findOne(input.projectId)

  if (!canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post to this project.')
  }

  const user = await ctx.db.User.findOne(ctx.userId)

  // TODO: Check if files
  const filesToSave = input.files.map(({ filename }) => ({
    filename,
    project,
    type: FILE_TYPES.IMAGE,
    user,
  }))

  const files = await ctx.db.File.save(filesToSave)

  return ctx.db.Post.save({
    caption: input.caption,
    files,
    project,
    user,
  })
})
