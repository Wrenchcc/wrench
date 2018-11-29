import UserError from './UserError'

export const requireAuth = resolver => async (obj, args, ctx, info) => {
  if (!ctx.userId) {
    return new UserError('You must be signed in to do this')
  }

  return resolver(obj, args, ctx, info)
}
