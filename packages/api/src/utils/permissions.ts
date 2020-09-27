import { AuthenticationError } from 'apollo-server-express'

export const isAuthenticated = resolver => async (obj, args, ctx, info) => {
  if (!ctx.userId) {
    return new AuthenticationError('You must be signed in to do this')
  }

  return resolver(obj, args, ctx, info)
}

export const isAdmin = id => {
  const userIds = [
    'c1f69907-1355-4f0e-a690-1acbbe848142',
    '9ad2d1b7-9a85-4c11-b0ef-10faf4e19699',
    '19491bb0-8e26-4f65-a149-e2855e59deea',
  ]

  return userIds.includes(id)
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

  return notification.to === userId
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
