import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModeratePost, isAdmin } from '../../utils/permissions'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const post = await ctx.db.Post.findOne(id)

  if (!canModeratePost(post, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this post.')
  }

  ctx.redis.delete(`post:filesConnection:${id}:*`)
  ctx.redis.delete(`project:cover:${id}`)
  ctx.db.PostTranslation.delete({ postId: id })

  const { files, ...rest } = input

  // Add new project if projectId is defined or use currenct project
  const project = await ctx.db.Project.findOne(rest.projectId || post.projectId)

  if (rest.collectionId) {
    await ctx.db.PostCollection.save({
      collectionId: rest.collectionId,
      projectId: project.id,
      postId: post.id,
    })
  } else {
    await ctx.db.PostCollection.delete({
      postId: post.id,
      // collectionId: input.collectionId, NOTE: Removes post from all collections
    })
  }

  if (files) {
    const savedFiles = await ctx.db.File.find({ postId: post.id })
    const deletedFiles = savedFiles.filter((file) => !files.includes(file.id))

    if (deletedFiles.length) {
      await ctx.db.File.delete(deletedFiles)
    }
  }

  return ctx.db.Post.save({
    ...post,
    ...rest,
    project,
  })
})
