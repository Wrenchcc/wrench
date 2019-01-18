import { isAuthenticated } from 'api/utils/permissions'
import { path } from 'ramda'
import { verifyRefreshToken, createToken } from 'api/utils/tokens'

export default isAuthenticated(async (_, { refreshToken }, ctx) => {
  const id = path(['userId'], verifyRefreshToken(refreshToken))

  if (!id) {
    throw new Error('Refresh token is invalid')
  }

  const refreshToken = await ctx.db.AuthToken.find({ where: { refreshToken } })

  return {
    tokens: {
      refreshToken,
      token: createToken({ id }),
    },
  }
})
