import { path } from 'ramda'
import { verifyRefreshToken, createToken } from 'api/utils/auth'

export const authenticateUser = async (_, { facebookToken }, { models, services }) => {
  // Get facebook data and create new user
  const { firstName, fullName, avatarUrl, lastName, id } = await services.facebook.getAccountData(
    facebookToken
  )

  const user = await models.user().findOne({ facebookId: id })
  console.log('here', user)

  // User already registred
  if (user) {
    return {
      tokens: {
        accessToken: createToken({ userId: user.id }),
        refreshToken: createToken({ userId: user.id }), // TODO Implement refreshToken
      },
    }
  }

  const createdUser = await models
    .user()
    .save({ username: 'pontus', firstName, fullName, avatarUrl, lastName, facebookId: id })

  console.log('createdUser', createdUser)

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
  const user = ctx.User.find({ id })

  return {
    tokens: {
      accessToken: createToken({ id }),
      refreshToken,
    },
  }
}
