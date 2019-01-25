import { ApolloError } from 'apollo-server-express'
import { path } from 'ramda'
import { REFRESH_TOKEN_CODES } from '@wrench/shared/src/utils/enums'
import { verifyRefreshToken, createAccessToken } from '../../utils/tokens'

export default async (_, { refreshToken }, ctx) => {
  const userId = path(['userId'], verifyRefreshToken(refreshToken))

  if (!userId) {
    return new ApolloError('Refresh Token invalid.', REFRESH_TOKEN_CODES.INVALID)
  }

  const user = await ctx.db.User.findOne({ where: { id: userId } })

  if (!user) {
    return new ApolloError('Refresh Token invalid.', REFRESH_TOKEN_CODES.INVALID)
  }

  const token = await ctx.db.AuthToken.findOne({ where: { refreshToken } })

  if (!token) {
    return new ApolloError('Refresh Token has been revoked.', REFRESH_TOKEN_CODES.REVOKED)
  }

  return {
    access_token: createAccessToken({ userId }),
  }
}
