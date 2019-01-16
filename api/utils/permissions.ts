import { AuthenticationError } from 'apollo-server-express'

export const isAuthenticated = resolver => async (obj, args, ctx, info) => {
  if (!ctx.userId) {
    return new AuthenticationError('You must be signed in to do this')
  }

  return resolver(obj, args, ctx, info)
}

export const isAdmin = id => {
  const userIds = ['']
  return userIds.indexOf(id) > -1
}

export const canModeratePost = (post, userId) => {
  if (!userId || !post) {
    return false
  }

  return post.userId === userId
}

export const canModerateNotification = (notification, userId) => {
  if (!userId || !notification) {
    return false
  }

  return notification.userId === userId
}

export const canModerateProject = (project, userId) => {
  if (!userId || !project) {
    return false
  }

  return project.userId === userId
}

export const canModerateComment = (comment, userId) => {
  if (!userId || !comment) {
    return false
  }

  return comment.userId === userId
}
