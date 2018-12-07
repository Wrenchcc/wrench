import UserError from './UserError'

export const requireAuth = resolver => async (obj, args, ctx, info) => {
  if (!ctx.userId) {
    return new UserError('You must be signed in to do this')
  }

  return resolver(obj, args, ctx, info)
}

export const canModeratePost = async (userId, postId, model) => {
  if (!userId || !postId) {
    return false
  }

  const post = await model.findOne(postId)

  if (!post) {
    return false
  }

  return post.userId === userId
}

export const canModerateProject = (project, userId) => {
  if (!userId || !project) {
    return false
  }

  return project.userId === userId
}
