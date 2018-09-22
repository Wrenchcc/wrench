import { path } from 'ramda'
import { verifyRefreshToken, createToken } from 'api/utils/auth'

export const authenticateUser = async (_, { facebookToken }, ctx) => {
  const user = await ctx.models.query.getUser({ facebookToken })

  // User already registred
  if (user) {
    return {
      tokens: {
        accessToken: createToken({ userId: user.id }),
        refreshToken: createToken({ userId: user.id }), // TODO Implement refreshToken
      },
    }
  }

  // Get facebook data and create new user
  const fbUser = await ctx.services.facebook.getAccountData(facebookToken)
  const createdUser = await ctx.models.mutation.createUser(fbUser) // TODO: format data for saving

  return {
    tokens: {
      accessToken: createToken({ userId: createdUser.id }),
      refreshToken: createToken({ userId: createdUser.id }), // TODO Implement refreshToken
    },
  }
}

export const refreshToken = async (_, { refreshToken }, ctx) => {
  const id = path(['userId'], verifyRefreshToken(refreshToken))

  if (!id) {
    throw new Error('refresh token was invalid... bad luck')
  }

  // 1. Check in database if current refreshToken exists
  // RefreshToken.find({ where: { refreshToken } })

  // 2. Check if the user exists (maybe not necessary)
  const user = ctx.models.query.getUser({ id })

  return {
    tokens: {
      accessToken: createToken({ id }),
      refreshToken,
    },
  }
}
