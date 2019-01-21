import { UserInputError } from 'apollo-server-express'
import { path } from 'ramda'
import { verifyRefreshToken, createAccessToken, createRefreshToken } from 'api/utils/tokens'

export default async (_, { refreshToken }, ctx) => {
  const userId = path(['userId'], verifyRefreshToken(refreshToken))

  if (!userId) {
    return new UserInputError('Your refresh token is invalid. Try to login again.')
  }

  const user = await ctx.db.User.findOne({ where: { id: userId } })

  if (!user) {
    return new UserInputError('Your refresh token is invalid. Try to login again.')
  }

  // const token = await ctx.db.AuthToken.findOne({ where: { refreshToken } })
  //
  // if (!token) {
  //   return new UserInputError('Your refresh token is invalid. Try to login again.')
  // }

  return {
    refreshToken: createRefreshToken({ userId }),
    accessToken: createAccessToken({ userId }),
  }
}
