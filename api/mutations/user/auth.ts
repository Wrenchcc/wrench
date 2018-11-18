import { path } from 'ramda'
import { verifyRefreshToken, createToken } from 'api/utils/auth'

export const authenticate = async (_, { facebookToken }, ctx) => {
  // Get facebook data and create new user
  const {
    firstName,
    fullName,
    avatarUrl,
    lastName,
    id,
  } = await ctx.services.facebook.getAccountData(facebookToken)

  const user = await ctx.db.User.findOne({ facebookId: id })

  // User already registred
  if (user) {
    return {
      tokens: {
        accessToken: createToken({ userId: user.id }),
        refreshToken: createToken({ userId: user.id }), // TODO Implement refreshToken
      },
    }
  }

  const createdUser = await ctx.db.User.save({
    avatarUrl,
    facebookId: id,
    firstName,
    fullName,
    lastName,
    username: 'pontus',
  })

  return {
    tokens: {
      accessToken: createToken({ userId: createdUser.id }),
      refreshToken: createToken({ userId: createdUser.id }), // TODO Implement refreshToken
    },
  }
}

export const refreshToken = async (_, __, ctx) => {
  const id = path(['userId'], verifyRefreshToken(refreshToken))

  if (!id) {
    throw new Error('refresh token was invalid... bad luck')
  }

  // 1. Check in database if current refreshToken exists
  // RefreshToken.find({ where: { refreshToken } })

  // 2. Check if the user exists (maybe not necessary)
  const user = ctx.db.User.findOne({ id })

  return {
    tokens: {
      accessToken: createToken({ id }),
      refreshToken,
    },
  }
}
