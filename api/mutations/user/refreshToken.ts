import { UserInputError } from 'apollo-server-express'
import { isAuthenticated } from 'api/utils/permissions'
import { path } from 'ramda'
import { verifyRefreshToken, createAccessToken } from 'api/utils/tokens'

export default isAuthenticated(async (_, { refreshToken }, ctx) => {
  const id = path(['userId'], verifyRefreshToken(refreshToken))

  if (!id) {
    // TODO: REFRESH_TOKEN_INVALID CODE
    return new UserInputError('Your refresh token is invalid. Try to relogin.')
  }

  const token = await ctx.db.AuthToken.find({ where: { refreshToken } })

  if (token) {
    // TODO: REFRESH_TOKEN_INVALID CODE
    return null
  }

  return {
    tokens: {
      refreshToken: token,
      accessToken: createAccessToken({ id }),
    },
  }
})
