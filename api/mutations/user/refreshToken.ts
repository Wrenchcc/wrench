import { path } from 'ramda'
import { verifyRefreshToken, createToken } from 'api/utils/tokens'

export default async (_, { refreshToken }, ctx) => {
  const id = path(['userId'], verifyRefreshToken(refreshToken))

  if (!id) {
    throw new Error('refresh token was invalid... bad luck')
  }

  // 1. Check in database if current refreshToken exists
  // const token = ctx.db.Tokens.findOne({ refreshToken })
  // RefreshToken.find({ where: { refreshToken } })

  // 2. Check if the user exists (maybe not necessary)
  const user = ctx.db.User.findOne({ id })

  return {
    tokens: {
      refreshToken,
      token: createToken({ id }),
    },
  }
}
