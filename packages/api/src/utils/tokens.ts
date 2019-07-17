import * as jwt from 'jsonwebtoken'

const debug = require('debug')('api:tokens')

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const getUserId = req => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET)
      return userId
    } catch (err) {
      debug(err)
      return null
    }
  }
}

export const verifyRefreshToken = refreshToken => {
  try {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
  } catch {
    return null
  }
}

export const createAccessToken = data => jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
export const createRefreshToken = data => jwt.sign(data, REFRESH_TOKEN_SECRET)

export const generateTokens = userId => ({
  access_token: createAccessToken({ userId }),
  refresh_token: createRefreshToken({ userId }),
})
