import { ForbiddenError, ApolloError } from 'apollo-server-express'
import { trim } from 'ramda'
import { isAuthenticated, canModerateProject } from '../../utils/permissions'
import { FILE_TYPES, ERROR_CODES } from '../../utils/enums'
import { extractHashtags } from '../../utils/regex'

const debug = require('debug')('api:mutations:post:add-post')

const SPAM_LMIT = 10

export default isAuthenticated(async (_, { input }, ctx) => {
  let language

  const project = await ctx.db.Project.findOne(input.projectId)
  const userPreviousPublishedPosts = await ctx.db.Post.userPreviousPublished(
    '5 minutes',
    ctx.userId
  )

  if (!canModerateProject(project, ctx.userId)) {
    return new ForbiddenError('You don’t have permission to post to this project.')
  }

  // if user has published posts in the last 5 minutes, check for spam
  if (userPreviousPublishedPosts.count > 0) {
    debug('User has posted at least once in the previous 5m - running spam checks')

    if (userPreviousPublishedPosts.count >= SPAM_LMIT) {
      debug('User has posted at least 10 times in the previous 5m')

      return new ApolloError(
        'You’ve been posting a lot! Please wait a few minutes before posting more.',
        ERROR_CODES.SPAM
      )
    }
  }

  // await Promise.all([
  //   ctx.redis.delete(`project:filesConnection:${input.projectId}:*`),
  //   ctx.redis.delete(`project:cover:${input.projectId}`),
  // ])

  ctx.redis.delete(`project:filesConnection:${input.projectId}:*`)
  ctx.redis.delete(`project:cover:${input.projectId}`)

  const filesToSave = input.files.map(({ filename }) => ({
    filename,
    project,
    type: FILE_TYPES.IMAGE,
    userId: ctx.userId,
  }))

  const files = await ctx.db.File.save(filesToSave)

  const hashtags = input.caption && extractHashtags(input.caption)

  if (hashtags) {
    ctx.db.Hashtag.findOrCreate(hashtags)
  }

  if(input.caption?.length) {
    language = await ctx.services.translate.detect(input.caption)
  }

  const post = await ctx.db.Post.save({
    caption: input.caption && trim(input.caption),
    files,
    project,
    language,
    userId: ctx.userId,
  })

  if (input.collectionId) {
    await ctx.db.PostCollection.save({
      collectionId: input.collectionId,
      projectId: project.id,
      postId: post.id,
    })
  }

  return post
})
