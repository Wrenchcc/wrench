import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'
import { FILE_TYPES } from '../../utils/enums'

// const debug = require('debug')('api:mutations:post:add-post')
//
// const SPAM_LMIT = 10

export default isAuthenticated(async (_, { input }, ctx) => {
  const project = await ctx.db.Project.findOne(input.projectId)
  // const userPreviousPublishedPosts = await ctx.db.Post.usersreviousPublished('5 minutes')

  if (!canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post to this project.')
  }

  // if user has published posts in the last 5 minutes, check for spam
  // if (userPreviousPublishedPosts && userPreviousPublishedPosts.length > 0) {
  //   debug('User has posted at least once in the previous 5m - running spam checks')
  //
  //   if (userPreviousPublishedPosts.length >= SPAM_LMIT) {
  //     debug('User has posted at least 10 times in the previous 5m')
  //
  //     return new ForbiddenError(
  //       'You’ve been posting a lot! Please wait a few minutes before posting more.'
  //     )
  //   }
  // }

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
