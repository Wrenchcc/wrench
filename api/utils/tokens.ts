import * as jwt from 'jsonwebtoken'
import * as ms from 'ms'

const { APP_JWT_SECRET } = process.env

export const getUserId = req => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      const { userId } = jwt.verify(token, APP_JWT_SECRET)
      return userId
    } catch {
      return null
    }
  }

  // No user authenticated
  return null
}

export const verifyRefreshToken = refreshToken => {
  try {
    return jwt.verify(refreshToken, APP_JWT_SECRET)
  } catch {
    return null
  }
}

export const createToken = data => jwt.sign(data, APP_JWT_SECRET)

export const generateTokens = userId => ({
  accessToken: createToken({ userId, expiresIn: ms('15m') }),
  refreshToken: createToken({ userId, expiresIn: ms('1m') }),
})
